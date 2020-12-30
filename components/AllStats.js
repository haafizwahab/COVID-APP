import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import {
  Appbar,
  Button,
  Card,
  Title,
  Paragraph,
  Subheading,
} from 'react-native-paper';

const AllStats = ({ navigation }) => {
  const [countries, setCountries] = useState([]);
  const [confirmed, setConfirmed] = useState('');
  const [recovered, setRecovered] = useState('');
  const [critical, setCritical] = useState('');
  const [deaths, setDeaths] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
  const [population, setPopulation] = useState('');

  const latestRequestOption = {
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/totals',
    headers: {
      'x-rapidapi-key': '0b326e5334msh0bdc66f1863b44cp107fadjsn55018cac2803',
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
    },
  };

  useEffect(() => {
    const getLatestTotal = () => {
      axios
        .request(latestRequestOption)
        .then(function (response) {
          const data = response.data;
          const countries = data.map((item) => ({
            confirmed: item.confirmed,
            deaths: item.deaths,
            critical: item.critical,
            recovered: item.recovered,
            update: item.lastUpdate,
          }));

          setCountries(countries);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    getLatestTotal();
  }, []);

  const populationRequestOption = {
    method: 'GET',
    url: 'https://world-population.p.rapidapi.com/worldpopulation',
    headers: {
      'x-rapidapi-key': '0b326e5334msh0bdc66f1863b44cp107fadjsn55018cac2803',
      'x-rapidapi-host': 'world-population.p.rapidapi.com',
    },
  };

  useEffect(() => {
    const getTotalWorldPopulation = () => {
      axios
        .request(populationRequestOption)
        .then(function (response) {
          setPopulation(response.data.body.world_population);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    getTotalWorldPopulation();
  });

  useEffect(() => {
    {
      countries.map((item) => {
        return (
          setConfirmed(item.confirmed),
          setCritical(item.critical),
          setDeaths(item.deaths),
          setRecovered(item.recovered),
          setLastUpdate(item.update)
        );
      });
    }
  }, [countries]);

  return (
    <View>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title='World Stats' />
      </Appbar.Header>

      <ScrollView>
        {/* confirmed cases card */}
        <Card style={styles.cardStyle}>
          <Card.Content>
            <Title style={styles.title}>Confirmed Cases</Title>
            <Paragraph style={styles.text}>+{confirmed}</Paragraph>
            <Subheading style={{ fontWeight: 'bold' }}>
              Percentage With Population
            </Subheading>
            <Paragraph style={styles.text}>
              {((confirmed / population) * 100).toFixed(2)} %
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Critical cases */}

        <Card style={styles.cardStyle}>
          <Card.Content>
            <Title style={styles.title}>Critical Cases</Title>
            <Paragraph style={styles.text}>+{critical}</Paragraph>
            <Subheading style={{ fontWeight: 'bold' }}>
              Percentage With Total Cases
            </Subheading>
            <Paragraph style={styles.text}>
              {((critical / confirmed) * 100).toFixed(2)} %
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Deaths */}
        <Card style={styles.cardStyle}>
          <Card.Content>
            <Title style={styles.title}>Total Deaths</Title>
            <Paragraph style={styles.text}>+{deaths}</Paragraph>
            <Subheading style={{ fontWeight: 'bold' }}>
              Percentage With Total Cases
            </Subheading>
            <Paragraph style={styles.text}>
              {((deaths / confirmed) * 100).toFixed(2)} %
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Recovered cases */}
        <Card style={styles.cardStyle}>
          <Card.Content>
            <Title style={styles.title}>Recovered Cases</Title>
            <Paragraph style={styles.text}>+{recovered}</Paragraph>
            <Subheading style={{ fontWeight: 'bold' }}>
              Percentage With Total Cases
            </Subheading>
            <Paragraph style={styles.text}>
              {((recovered / confirmed) * 100).toFixed(2)} %
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Last Update */}
        <Card style={styles.cardStyle}>
          <Card.Content>
            <Title style={styles.title}>Last Update</Title>
            <Paragraph>+{lastUpdate}</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

export default AllStats;

const styles = StyleSheet.create({
  cardStyle: {
    margin: 20,
    height: 150,
    shadowColor: '#000000',
    shadowOpacity: 10,
    shadowRadius: 2,
  },
  title: {
    fontSize: 25,
  },
  text: {
    fontSize: 20,
  },
});
