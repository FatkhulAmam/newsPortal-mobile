import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {Header, Body, Right, Button, Title} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

const Favorites = ({navigation}) => {
  return (
    <View>
      <Header style={styles.header} transparent>
        <StatusBar backgroundColor={'#A00000'} />
        <Body>
          <Title style={styles.text}>Activities Page</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate('Search')}>
            <Icon name="search" size={20} />
          </Button>
        </Right>
      </Header>
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
  },
});
