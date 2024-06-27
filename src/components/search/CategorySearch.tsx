import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'

const CategorySearch = (): JSX.Element => {
  const exampleGenre = {
    id: 999,
    name: 'Example Genre',
  }

  const navigation = useNavigation()
  const pushAction = StackActions.push('Category Search Result', {
    genre: exampleGenre,
  })

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            navigation.dispatch(pushAction)
          }}
        >
          <Text style={styles.searchButtonText}>
            Go To Category Search Result Page
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonWrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#8978A4',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 100,
    width: '100%',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
})

export default CategorySearch
