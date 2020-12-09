import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Header, Text, Right, Button, Card} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {API_URL} from '@env';

import {getProfile} from '../../redux/actions/profile';
import avatar from '../../assets/images/avatar.png';

const Profile = ({navigation}) => {
  const user = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile(token));
  }, [dispatch, token]);

  return (
    <>
      <View style={styles.parent}>
        <Header style={styles.header} transparent>
          <StatusBar backgroundColor={'#A00000'} />
          <Right>
            <Button transparent onPress={() => navigation.navigate('Search')}>
              <Icon name="search" size={22} />
            </Button>
          </Right>
        </Header>
        <Card style={styles.bioCard} transparent>
          <Image
            style={styles.image}
            source={
              user.data.photo ? {uri: `${API_URL}${user.data.photo}`} : avatar
            }
          />
          <Text style={styles.name}>{user.data.name}</Text>
          <Text>{user.data.email}</Text>
          <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}>
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch({type: 'LOGOUT'})}>
              <Text style={styles.logoutTxt}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Card>
        <Button
          tra
          block
          style={styles.btnNews}
          onPress={() => navigation.navigate('MyNews')}>
          <Text>My News</Text>
        </Button>
      </View>
      <Card style={styles.cardWrite} transparent>
        <Text>Tulis redaksi Anda</Text>
        <Text note>jadi profesional dan melampauinya</Text>
        <Button
          style={styles.btnWrite}
          onPress={() => navigation.navigate('AddNews')}
          block>
          <Text style={styles.btntext}>Write</Text>
        </Button>
      </Card>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#FFFFFF',
  },
  bioCard: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
  },
  tittle: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: '#E8E8E8',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  menu: {
    flexDirection: 'row',
    marginTop: 10,
  },
  edit: {
    color: '#C10000',
    fontSize: 18,
    paddingRight: 25,
  },
  logoutTxt: {
    fontSize: 18,
    color: '#C10000',
    paddingLeft: 25,
  },
  cardWrite: {
    backgroundColor: '#e6e6e6',
    height: 150,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnWrite: {
    backgroundColor: '#A10000',
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 25,
  },
  btnNews: {
    backgroundColor: '#A10000',
  },
});
