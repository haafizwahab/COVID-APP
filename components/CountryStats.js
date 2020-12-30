import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Searchbar, Appbar } from 'react-native-paper';
import axios from 'axios';

const CountryStats = ({ route, navigation }) => {
  const name = route.params;
  const options = {
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/country',
    params: { name: `${name}` },
    headers: {
      'x-rapidapi-key': '0b326e5334msh0bdc66f1863b44cp107fadjsn55018cac2803',
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  return (
    <View>
      <Appbar.Header>
        <Appbar.Action
          icon='arrow-left'
          onPress={() => navigation.navigate('CountryStats')}
        />
        <Appbar.Content title='Single Country' />
      </Appbar.Header>
    </View>
  );
};

export default CountryStats;

const styles = StyleSheet.create({});
