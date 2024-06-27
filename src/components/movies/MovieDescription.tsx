import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import type { Movie } from '../../types/app'
import { API_ACCESS_TOKEN } from '@env'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MovieColumn = ({ title, content }: any): JSX.Element => {
  return (
    <View style={styles.column}>
      <Text style={styles.columnTitle}>{title}</Text>
      <Text>{content}</Text>
    </View>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MovieDescription = ({ movieId }: any): JSX.Element => {
  const [movie, setMovie] = useState<Movie>()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    getMovie()
    checkIfFavorite(movieId)
  }, [])

  const getMovie = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((data) => {
        setMovie(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const checkIfFavorite = async (movieId: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')

      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData)
        const isFav = favMovieList.some((favMovie) => favMovie.id === movieId)
        setIsFavorite(isFav)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')

      const favMovieList: Movie[] = initialData ? JSON.parse(initialData) : []
      favMovieList.push(movie)
      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList))
      setIsFavorite(true)
    } catch (error) {
      console.log(error)
    }
  }

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')

      if (initialData !== null) {
        let favMovieList: Movie[] = JSON.parse(initialData)
        favMovieList = favMovieList.filter((favMovie) => favMovie.id !== id)
        await AsyncStorage.setItem(
          '@FavoriteList',
          JSON.stringify(favMovieList),
        )
        setIsFavorite(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const toggleFavorite = (): void => {
    if (movie) {
      if (isFavorite) {
        removeFavorite(movie.id)
      } else {
        addFavorite(movie)
      }
    }
  }

  return (
    <View>
      {movie && (
        <View>
          <ImageBackground
            resizeMode="cover"
            style={styles.backgroundImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            }}
          >
            <LinearGradient
              colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
              locations={[0.6, 0.8]}
              style={styles.gradientStyle}
            >
              <View>
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <View style={styles.ratingContainer}>
                  <FontAwesome name="star" size={20} color="yellow" />
                  <Text style={styles.rating}>
                    {movie.vote_average.toFixed(1)}
                  </Text>
                </View>
              </View>

              <TouchableOpacity onPress={toggleFavorite}>
                <FontAwesome
                  name={isFavorite ? 'heart' : 'heart-o'}
                  size={24}
                  color="pink"
                />
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>

          <View style={styles.container}>
            <Text style={styles.movieOverview}>{movie.overview}</Text>

            <View style={styles.row}>
              <MovieColumn
                title="Original Language"
                content={movie.original_language}
              />
              <MovieColumn
                title="Popularity"
                content={movie.popularity.toFixed(2)}
              />
            </View>
            <View style={styles.row}>
              <MovieColumn title="Release Date" content={movie.release_date} />
              <MovieColumn title="Vote Count" content={movie.vote_count} />
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 12,
  },
  backgroundImage: {
    width: '100%',
    height: 250,
  },
  movieTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 3,
  },
  gradientStyle: {
    padding: 20,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    color: 'yellow',
    fontWeight: '700',
    fontSize: 18,
  },
  movieOverview: {
    color: 'black',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  columnTitle: {
    color: 'black',
    fontWeight: '900',
  },
})

export default MovieDescription
