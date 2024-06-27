import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieItem from '../components/movies/MovieItem';
import { useIsFocused } from '@react-navigation/native';
import type { Movie } from '../types/app';

export default function Favorite(): JSX.Element {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { width } = Dimensions.get('window');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchFavoriteMovies()
    }
  }, [isFocused])

  const fetchFavoriteMovies = async (): Promise<void> => {
    try {
      const favoriteMoviesData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      if (favoriteMoviesData) {
        const favoriteMoviesList: Movie[] = JSON.parse(favoriteMoviesData)
        setFavoriteMovies(favoriteMoviesList)
      }
      setIsLoading(false); 
    } catch (error) {
      console.log(error);
      setIsLoading(false); 
    }
  };

  const renderSeparator = (): JSX.Element => {
  return <View style={styles.separator} />;
 };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.centeredView}>
          
        </View>
      ) : favoriteMovies.length === 0 ? (
        <View style={styles.centeredView}>
          <Text style={styles.title}>You don't have a favorite movie yet</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteMovies}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer}>
              <MovieItem
                movie={item}
                size={{ width: width / 2 - 32, height: (width / 2 - 32) * 1.5 }}
                coverType="poster"
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          ItemSeparatorComponent={renderSeparator}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 32,
    flex: 1,
    paddingHorizontal: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  itemContainer: {
    padding: 8,
  },
  separator: {
    width: '100%',
    height: 8,
  },
});
