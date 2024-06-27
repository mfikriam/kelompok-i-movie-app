import React from 'react'
import { View, StyleSheet } from 'react-native'
import type { Movie } from '../../types/app'
import MovieItem from '../../components/movies/MovieItem'
import { FlatGrid } from 'react-native-super-grid'

const ShowMovies = ({ movies }: { movies: Movie[] }): JSX.Element => {
  return (
    <FlatGrid
      itemDimension={100}
      data={movies}
      spacing={9}
      renderItem={({ item }: { item: Movie }) => (
        <View style={styles.itemContainer}>
          <MovieItem
            movie={item}
            size={{
              width: 100,
              height: 160,
            }}
            coverType="poster"
            key={String(item.id)}
          />
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ShowMovies
