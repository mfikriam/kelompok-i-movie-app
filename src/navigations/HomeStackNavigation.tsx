import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import MovieDetail from '../screens/MovieDetail'

const Stack = createNativeStackNavigator()

const HomeStackNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="Home Page">
      <Stack.Screen
        name="Home Page"
        component={Home}
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

export default HomeStackNavigation
