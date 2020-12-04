import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Header, Button, Body} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

const Search = ({navigation}) => {
  return (
    <>
      <Header style={styles.header} transparent>
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={30} />
        </Button>
        <Body>
          <View style={styles.searchIcon}>
            <TextInput style={styles.search} placeholder="Search" />
            <Icon style={styles.icon} name="search" size={20} />
          </View>
        </Body>
      </Header>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  search: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    borderRadius: 50,
    paddingLeft: 35,
    fontSize: 20,
    marginLeft: 13,
    marginTop: 5,
  },
  icon: {
    color: '#a3a3a3',
    position: 'absolute',
    top: 14,
    left: 23,
  },
  searchIcon: {
    position: 'relative',
  },
});
