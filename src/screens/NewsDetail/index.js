import React, {useEffect} from 'react';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import {Header, Body, Right, Button, Title, Text, Left} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {API_URL} from '@env';
import moment from 'moment';

import {getDetail} from '../../redux/actions/news';
import DefaultImage from '../../assets/images/default.png';

const Detail = ({route}) => {
  const token = useSelector((state) => state.auth.token);
  const detailNews = useSelector((state) => state.news.detailNews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(token, route.params));
  }, [dispatch, route.params, token]);

  return (
    <>
      <Header style={styles.header} transparent>
        <Body>
          <Title style={styles.text}>Maos News</Title>
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
        <ScrollView>
          <Image
            style={styles.image}
            source={
              detailNews.picture
                ? {uri: `${API_URL}${detailNews.picture}`}
                : DefaultImage
            }
          />
          <View style={styles.titleContain}>
            <Text style={styles.title}>{detailNews.headline}</Text>
            <View style={styles.about}>
              <Text>{detailNews.author.name}</Text>
              <Left />
              <Text note>
                {moment(detailNews.createdAt).format('MMMM Do YYYY')}
              </Text>
            </View>
            <Text>{detailNews.description}</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Detail;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
  },
  parent: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  image: {
    backgroundColor: '#F0F0F0',
    width: 360,
    height: 250,
  },
  titleContain: {
    padding: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  about: {
    marginTop: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    paddingBottom: 10,
    marginBottom: 10,
  },
});
