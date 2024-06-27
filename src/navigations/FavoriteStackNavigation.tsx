import React, { useCallback } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFocusEffect, CommonActions } from '@react-navigation/native'
import Favorite from '../screens/Favorite'
import MovieDetail from '../screens/MovieDetail'

const Stack = createNativeStackNavigator()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FavoriteStackNavigation = ({ navigation }: any): JSX.Element => {
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('blur', () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Favorite Page' }],
          }),
        )
      })

      return unsubscribe
    }, [navigation]),
  )

  return (
    <Stack.Navigator initialRouteName="Favorite Page">
      <Stack.Screen
        name="Favorite Page"
        component={Favorite}
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
    </Stack.Navigator>
  )
}

export default FavoriteStackNavigation
