import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import Home from './home';
import Rank from './rank';
import Profile from './profile';

const BottomTab = createBottomTabNavigator();

const AppNav = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2600FF',
          tabBarActiveBackgroundColor: 'transparent',
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <MCIcons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Rank"
          component={Rank}
          options={{
            tabBarIcon: ({color, size}) => (
              <MCIcons
                name="check-decagram-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="user" color={color} size={size} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
