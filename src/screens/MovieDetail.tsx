import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import MovieList from '../components/movies/MovieList'
import MovieDescription from '../components/movies/MovieDescription'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params

  return (
    <ScrollView>
      <View style={styles.container}>
        <MovieDescription movieId={id} />

        <MovieList
          title="Recommendation"
          path={`movie/${id}/recommendations`}
          coverType="poster"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 32,
  },
})

export default MovieDetail
