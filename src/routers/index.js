import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// import component

//import screens
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import ForgotPassword from '../screens/ForgotPassword';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Activities from '../screens/Activities';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import EditProfile from '../screens/EditProfille';
import AddNews from '../screens/AddNews';
import MyNews from '../screens/MyNews';
import NewsDetail from '../screens/NewsDetail';

import BottomNavigation from '../components/BottomNavigation';

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigation {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

class Route extends Component {
  componentDidMount() {
    console.log(this.props.auth);
  }

  render() {
    return (
      <NavigationContainer>
        {!this.props.auth.isLogin ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="MainApp"
              component={MainApp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddNews"
              component={AddNews}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyNews"
              component={MyNews}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NewsDetail"
              component={NewsDetail}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Route);
