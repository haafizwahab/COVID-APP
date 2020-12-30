import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import Country from './Country';
import uuid from 'react-native-uuid';

import { Searchbar, Appbar } from 'react-native-paper';

const CountryStats = ({ navigation }) => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filtered, setFiltered] = useState([]);
  const onSearchChange = (text) => {
    setSearchText(text);
    console.log(searchText);
  };

  useEffect(() => {
    const filter = countries.filter((country) => {
      return country.name.match(searchText);
    });
    setFiltered(filter);
    // console.log(filtered);
  }, [searchText]);

  useEffect(() => {
    const getCountries = () => {
      axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
        const data = res.data;
        const countries = data.map((country) => ({
          name: country.name,
          avatar: country.flag,
          id: uuid.v4(),
        }));

        setCountries(countries);
      });
    };
    getCountries();
  }, []);
  return (
    <View>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='Countries List' />
      </Appbar.Header>
      <Searchbar
        placeholder='Search Country'
        style={{ margin: 20 }}
        onChangeText={onSearchChange}
        value={searchText}
      />
      {filtered.length === 0 ? (
        <FlatList
          data={countries}
          style={{ marginBottom: 20 }}
          renderItem={({ item }) => (
            <Country
              name={item.name}
              avatar={item.avatar}
              id={item.id}
              navigation={navigation}
            />
          )}
        />
      ) : (
        <FlatList
          data={filtered}
          style={{ marginBottom: 20 }}
          renderItem={({ item }) => (
            <Country name={item.name} avatar={item.avatar} />
          )}
        />
      )}
    </View>
  );
};

export default CountryStats;

const styles = StyleSheet.create({});
