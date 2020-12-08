import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Header,
  Text,
  Form,
  Item,
  Input,
  Label,
  Body,
  Right,
  Button,
  Title,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import {getProfile} from '../../redux/actions/profile';
import avatar from '../../assets/images/profile.png';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const EditProfile = () => {
  const user = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile(token));
  }, [dispatch, token]);

  const [avatarSource, setAvatarSource] = useState(avatar);

  const takePicture = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        setAvatarSource({
          avatarSource: source,
        });
      }
    });
  };

  return (
    <>
      <View style={styles.parent}>
        <Header transparent>
          <Body>
            <Title style={styles.text}>Edit profile</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Text style={styles.savetxt}>save</Text>
            </Button>
          </Right>
        </Header>
        <ScrollView>
          {Object.keys(user.data).length && (
            <View style={styles.component}>
              <View>
                <View style={styles.userBio}>
                  <Image style={styles.image} source={{uri: avatarSource}} />
                  <TouchableOpacity onPress={takePicture}>
                    <Text style={styles.pick}>Choose Image</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Form>
                  <Item floatingLabel>
                    <Label>Username</Label>
                    <Input value={user.data.name} />
                  </Item>
                  <Item floatingLabel>
                    <Label>email</Label>
                    <Input value={user.data.email} />
                  </Item>
                  <Item floatingLabel>
                    <Label>gender</Label>
                    <Input value={user.data.gender} />
                  </Item>
                  <Item floatingLabel last>
                    <Label>birth</Label>
                    <Input value={user.data.birth_date} />
                  </Item>
                  <Item floatingLabel>
                    <Label>password</Label>
                    <Input value={user.data.password} />
                  </Item>
                </Form>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
  },
  savetxt: {
    color: '#A10000',
  },
  component: {
    margin: 20,
  },
  userBio: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: '#E8E8E8',
  },
  pick: {
    color: '#A10000',
    marginTop: 20,
  },
});
