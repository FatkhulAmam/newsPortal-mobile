import React, {useEffect} from 'react';
import {StyleSheet, FlatList, View, StatusBar} from 'react-native';
import {Header, Body, Right, Button, Title, Text} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {API_URL} from '@env';
import moment from 'moment';

import {getNewsMyNews} from '../../redux/actions/news';
import CardNews from '../../components/CardMyNews';

const Mynews = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const dataMyNews = useSelector((state) => state.news.myNews);

  useEffect(() => {
    dispatch(getNewsMyNews(token));
  }, [dispatch, token]);

  return (
    <>
      <Header style={styles.header} transparent>
        <StatusBar backgroundColor={'#A00000'} />
        <Body>
          <Title style={styles.text}>My News</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate('Search')}>
            <Icon name="search" size={20} />
          </Button>
        </Right>
      </Header>
      <View style={styles.parent}>
        <View style={styles.tagEdit}>
          <Text>Tap to edit</Text>
        </View>
        <FlatList
          data={dataMyNews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <CardNews
              headline={item.headline}
              author={item.author.name}
              createdAt={moment(item.createdAt).format('MMMM Do YYYY')}
              image={`${API_URL}${item.picture}`}
              moveDetail={() =>
                this.props.navigation.navigate('NewsDetail', item.id)
              }
            />
          )}
        />
      </View>
    </>
  );
};

export default Mynews;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
  },
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tagEdit: {
    alignItems: 'center',
  },
  cardImage: {
    width: 300,
    height: 175,
  },
  headline: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  about: {
    flexDirection: 'row',
  },
  editTxt: {
    color: '#A10000',
  },
});
