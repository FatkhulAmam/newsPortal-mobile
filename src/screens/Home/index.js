import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Header, Body, Right, Button, Title, Text} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {API_URL} from '@env';
import moment from 'moment';

import {getNews, getNewsScroll} from '../../redux/actions/news';
import CardNews from '../../components/CardNews';
import {set} from 'react-native-reanimated';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const newsIndex = useSelector((state) => state.news);
  const news = useSelector((state) => state.news.data.result);
  const newsPage = useSelector((state) => state.news.res);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(news);
  const [searchValue, setSearchValue] = useState(news);
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortValue, setSortValue] = useState('desc');
  useEffect(() => {
    dispatch(getNews(token, sortKey, sortValue));
  }, [dispatch, token, sortKey, sortValue]);

  const nextPage = () => {
    console.log('amam');
  };

  const newsDesc = () => {
    setSortValue('desc');
    return dispatch(getNews(token, sortKey, sortValue));
  };

  const newsAsc = () => {
    setSortValue('asc');
    return dispatch(getNews(token, sortKey, sortValue));
  };

  return (
    <>
      <Header style={styles.header} transparent>
        <StatusBar backgroundColor={'#A00000'} />
        <Body>
          <Title style={styles.text}>Maos News</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => setModalVisible(true)}>
            <Icon name="filter" size={20} />
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
                moveDetail={() => navigation.navigate('NewsDetail', item.id)}
              />
            )}
            onEndReached={nextPage}
            onEndReachedThreshold={0.5}
          />
        </View>
      )}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible, newsAsc())}>
              <Text style={styles.modalText}>Sort By date : Ascending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible, newsDesc())}>
              <Text style={styles.modalText}>Sort By date : Descending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Search', setModalVisible(!modalVisible))
              }>
              <Text style={styles.modalText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.modalText} note>
                cencel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 275,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    width: 250,
    fontSize: 20,
  },
});
