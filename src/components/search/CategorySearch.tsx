import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import { FlatGrid } from 'react-native-super-grid'
import { useNavigation, StackActions } from '@react-navigation/native'

const CategorySearch = (): JSX.Element => {
  const [genres, setGenres] = useState([])
  const [status, setStatus] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<{
    id: number
    name: string
  }>()

  const navigation = useNavigation()
  const pushAction = StackActions.push('Category Search Result', {
    genre: selectedGenre,
  })

  useEffect(() => {
    getGenres()
  }, [])

  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="large" />
      case 'success':
        return (
          <View>
            <FlatGrid
              itemDimension={100}
              data={genres}
              spacing={10}
              renderItem={({
                item,
              }: {
                item: { id: number; name: string }
              }) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.9}
                  style={{
                    ...styles.genreBar,
                    backgroundColor:
                      item.id === selectedGenre?.id ? '#8978A4' : '#C0B4D5',
                  }}
                  onPress={() => {
                    setSelectedGenre(item)
                  }}
                >
                  <Text style={styles.genreBarLabel}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )
      case 'error':
        return (
          <Text style={styles.errorText}>
            Error when request data from themoviedb.
          </Text>
        )
      default:
        return null
    }
  }

  const getGenres = async (): Promise<void> => {
    setStatus('loading')

    const url = `https://api.themoviedb.org/3/genre/movie/list?language=en`
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
        setGenres(data.genres)
        setStatus('success')
      })
      .catch((error) => {
        console.log(error)
        setGenres([])
        setStatus('error')
      })
  }

  return (
    <View style={styles.container}>
      {renderComponent()}
      {selectedGenre && (
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              navigation.dispatch(pushAction)
            }}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  genreBar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    borderRadius: 5,
  },
  genreBarLabel: { color: 'black', fontSize: 16 },
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
