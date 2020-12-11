import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {Header, Body, Right, Button, Title} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {API_URL} from '@env';
import moment from 'moment';

import {getNews, getNewsScroll} from '../../redux/actions/news';
import CardNews from '../../components/CardNews';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const newsIndex = useSelector((state) => state.news);
  const news = useSelector((state) => state.news.data.result);
  const newsPage = useSelector((state) => state.news.res);
  const [data, setData] = useState(news);
  useEffect(() => {
    dispatch(getNews(token));
  }, [dispatch, token]);

  const nextPage = () => {
    console.log('amam');
  };

  return (
    <>
      <Header style={styles.header} transparent>
        <StatusBar backgroundColor={'#A00000'} />
        <Body>
          <Title style={styles.text}>Maos News</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate('Search')}>
            <Icon name="search" size={20} />
          </Button>
        </Right>
      </Header>
      {newsIndex.isLoading === true ? (
        <ActivityIndicator
          size="large"
          color="#A00000"
          animating={newsIndex.isLoading}
          style={styles.indicator}
        />
      ) : (
        <View style={styles.parent}>
          <FlatList
            data={data}
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
            onEndReached={nextPage}
            onEndReachedThreshold={0.5}
          />
        </View>
      )}
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
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
