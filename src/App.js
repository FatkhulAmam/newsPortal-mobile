import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Router from './routers'

const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  )
}

export default App
