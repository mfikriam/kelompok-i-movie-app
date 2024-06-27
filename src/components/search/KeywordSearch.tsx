import React, { useState } from 'react'
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import MovieItem from '../movies/MovieItem'
import { API_ACCESS_TOKEN } from '@env'
import { Movie } from '../../types/app'

const KeywordSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<Movie[]>([])
  const navigation = useNavigation()

  const getMovieList = async (query: string): Promise<void> => {
    const path = `search/movie?query=${query}&page=1`
    const url = `https://api.themoviedb.org/3/${path}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      setResults(data.results)
    } catch (error) {
      console.error('Failed to fetch movies:', error)
    }
  }

  const handleSearch = () => {
    if (query.trim()) {
      getMovieList(query)
    }
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Judul Film Di sini.."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <FontAwesome
            name="search"
            size={24}
            color="#555"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              navigation.dispatch(
                StackActions.push('Movie Detail', { id: item.id }),
              )
            }}
          >
            <MovieItem
              movie={item}
              size={{ width: 100, height: 160 }}
              coverType="poster"
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `${item.id}`}
        numColumns={3}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#ebebeb',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  itemContainer: {
    margin: 8,
    alignItems: 'center',
  },
  list: {
    paddingBottom: 16,
  },
})

export default KeywordSearch
