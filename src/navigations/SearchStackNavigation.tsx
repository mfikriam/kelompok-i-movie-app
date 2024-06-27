import React, { useCallback } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFocusEffect, CommonActions } from '@react-navigation/native'
import Search from '../screens/Search'
import MovieDetail from '../screens/MovieDetail'
import CategorySearchResult from '../screens/CategorySearchResult'

const Stack = createNativeStackNavigator()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SearchStackNavigation = ({ navigation }: any): JSX.Element => {
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('blur', () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Search Page' }],
          }),
        )
      })

      return unsubscribe
    }, [navigation]),
  )

  return (
    <Stack.Navigator initialRouteName="Search Page">
      <Stack.Screen
        name="Search Page"
        component={Search}
        options={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 300,
        }}
      />
      <Stack.Screen
        name="Movie Detail"
        component={MovieDetail}
        options={{
          animation: 'fade',
          animationDuration: 300,
        }}
      />
      <Stack.Screen
        name="Category Search Result"
        component={CategorySearchResult}
        options={{
          animation: 'fade',
          animationDuration: 300,
        }}
      />
    </Stack.Navigator>
  )
}

export default SearchStackNavigation
