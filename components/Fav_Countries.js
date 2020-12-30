import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Searchbar, Appbar } from 'react-native-paper';

const Fav_Countries = ({ navigation }) => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Favourite Countries' />
      </Appbar.Header>
    </View>
  );
};

export default Fav_Countries;

const styles = StyleSheet.create({});
