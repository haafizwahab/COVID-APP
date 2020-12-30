import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AllStats from './AllStats';
import CountryStats from './CountriesStats';

import Fav_Countries from './Fav_Countries';

const Drawer = createDrawerNavigator();
const Stack = () => {
  return (
    <Drawer.Navigator initialRouteName='AllStats'>
      <Drawer.Screen
        name='AllStats'
        component={AllStats}
        options={{ title: 'World Statistics' }}
      />
      <Drawer.Screen
        name='CountryStats'
        component={CountryStats}
        options={{ title: 'Country Statistics' }}
      />

      <Drawer.Screen
        name='Fav_Countries'
        component={Fav_Countries}
        options={{ title: 'Favourite Countries' }}
      />
    </Drawer.Navigator>
  );
};

export default Stack;

const styles = StyleSheet.create({});
