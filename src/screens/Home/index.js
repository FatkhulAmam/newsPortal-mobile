import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Header, Body, Right, Button, Title, Text} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/FontAwesome';
import {API_URL} from '@env';
import moment from 'moment';

import {getNews, getSortingNews} from '../../redux/actions/news';
import CardNews from '../../components/CardNews';

PushNotification.createChannel(
  {
    channelId: 'notif', // (required)
    channelName: 'Notif channel', // (required)
    channelDescription: 'A channel to welcoming reader notif', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(getNews(token));
    PushNotification.localNotification({
      channelId: 'notif',
      tittle: 'Maos News',
      message: 'Welcome Maos Readers!!',
    });
  }, [dispatch, token]);

  const news = useSelector((state) => state.news.data.result);
  const newsIndex = useSelector((state) => state.news);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortKey, setSortKey] = useState('');
  const [sortValue, setSortValue] = useState('');

  const nextPage = () => {
    console.log('amam');
  };

  const newsDesc = async () => {
    await dispatch(getSortingNews(token, 'createdAt', 'desc'));
  };

  const newsAsc = async () => {
    await dispatch(getSortingNews(token, 'createdAt', 'asc'));
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
          <Button transparent onPress={() => navigation.navigate('Search')}>
            <Icon name="search" size={20} />
          </Button>
        </Right>
      </Header>
      <View style={styles.parent}>
        {newsIndex.isLoading === false ? (
          <FlatList
            data={news}
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
        ) : (
          <ActivityIndicator
            size="large"
            color="#A00000"
            animating={newsIndex.isLoading}
            style={styles.indicator}
          />
        )}
      </View>
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
