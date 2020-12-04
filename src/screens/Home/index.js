import React from 'react';
import {StyleSheet} from 'react-native';
import {Header, Body, Right, Button, Title} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({navigation}) => {
  return (
    <>
      <Header style={styles.header} transparent>
        <Body>
          <Title style={styles.text}>Home Page</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate('Search')}>
            <Icon name="search" size={20} />
          </Button>
        </Right>
      </Header>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
  },
});
