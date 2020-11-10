import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// import component

//import screens
import Splash from '../screens/Splash'
import Home from '../screens/Home'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Activities from '../screens/Activities';
import Profile from '../screens/Profile'
import Search from '../screens/Search'
import EditProfile from '../screens/EditProfille'
import AddNews from '../screens/AddNews'

import BottomNavigation from '../components/BottomNavigation'

const MainApp = () => {
    return (
        <Tab.Navigator tabBar={props => <BottomNavigation {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Activities" component={Activities} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

const Route = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
            <Stack.Screen name="AddNews" component={AddNews} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Route
