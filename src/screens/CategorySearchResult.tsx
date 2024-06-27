import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, ActivityIndicator } from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import type { Movie } from '../types/app'
import ShowMovies from '../components/movies/ShowMovies'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategorySearchResult = ({ route }: any): JSX.Element => {
  const { genre } = route.params
  const [movies, setMovies] = useState<Movie[]>([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    getMovies()
  }, [])

  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="large" />
      case 'success':
        return (
          <>
            {movies.length === 0 ? (
              <Text style={styles.noResults}>No results found</Text>
            ) : (
              <ShowMovies movies={movies} />
            )}
          </>
        )
      case 'error':
        return (
          <Text style={styles.errorText}>
            Error when request data from themoviedb.
          </Text>
        )
      default:
        return
    }
  }

  const getMovies = async (): Promise<void> => {
    setStatus('loading')

    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}`
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
        setMovies(data.results)
        setStatus('success')
      })
      .catch((error) => {
        console.log(error)
        setMovies([])
        setStatus('error')
      })
  }

  return (
    <>
      <Text style={styles.header}>{`Result of ${genre.name} Genre`}</Text>
      {renderComponent()}
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    marginVertical: 20,
    textAlign: 'center',
  },
  noResults: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
})

export default CategorySearchResult
