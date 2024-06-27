import React from 'react'
import { Text, View } from 'react-native'

const Favorite = (): JSX.Element => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>
        Favorite Movies Page
      </Text>

      {/* Pakai ShowMovies components untuk menampilkan list movies */}
    </View>
  )
}

export default Favorite
