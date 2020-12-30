import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Country = ({ name, avatar, id, navigation }) => {
  const [object, setOject] = useState(null);
  const [searchName, setSearchName] = useState('');

  const storeData = async () => {
    try {
      let data = object;
      let jsonValue = await AsyncStorage.getItem('@fav:key');
      let prevData = jsonValue != null ? JSON.parse(jsonValue) : [];
      if (prevData.length > 0) {
        prevData = [...prevData, data];
      } else {
        prevData = [];
        prevData.push(data);
      }
      jsonValue = JSON.stringify(prevData);
      await AsyncStorage.setItem('@fav:key', jsonValue);
      //   console.log(jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  useEffect(() => {
    storeData();
  }, [object]);
  const onItemClick = () => {
    setOject((object) => ({ ...object, id: id }));
    setOject((object) => ({ ...object, name: name }));
    navigation.navigate('SingleCountry', { name: name });
  };
  return (
    <View>
      <List.Item
        title={name}
        right={() => <List.Icon icon='star-outline' />}
        onPress={() => onItemClick()}
      />
      <View
        style={{
          height: 1,
          backgroundColor: '#000000',
          marginLeft: 10,
          marginRight: 10,
        }}
      ></View>
    </View>
  );
};

export default Country;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
