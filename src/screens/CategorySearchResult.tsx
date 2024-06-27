import React from 'react'
import { Text, View } from 'react-native'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategorySearchResult = ({ route }: any): JSX.Element => {
  const { genre } = route.params
  console.log(genre)

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>
        CategorySearchResult Page
      </Text>

      {/* Pakai ShowMovies components untuk menampilkan list movies */}
    </View>
  )
}

export default CategorySearchResult
