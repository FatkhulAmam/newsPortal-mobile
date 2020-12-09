import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
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
import * as yup from 'yup';
import {Formik} from 'formik';
import {API_URL} from '@env';

import {getProfile} from '../../redux/actions/profile';
import ProfileDefault from '../../assets/images/avatar.png';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const schemaValidation = yup.object().shape({
  userName: yup.string(),
  email: yup.string().email('Masukkan alamat email dengan benar'),
  gender: yup.string(),
  birth: yup.string(),
  password: yup.string().min(8, 'Password setidaknya terdiri dari 8 karakter'),
});

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token);
  const [avatar, setAvatar] = useState(ProfileDefault);
  useEffect(() => {
    dispatch(getProfile(token));
  }, [dispatch, token]);

  const takePicture = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setAvatar({uri: response.uri});
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={{
          userName: user.data.name,
          email: user.data.email,
          gender: user.data.gender,
          birth: user.data.birth_date,
        }}
        validationSchema={schemaValidation}
        onSubmit={(values) => this.dologin(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <View style={styles.parent}>
            <Header transparent>
              <StatusBar backgroundColor={'#A00000'} />
              <Body>
                <Title style={styles.text}>Edit profile</Title>
              </Body>
              <Right>
                <Button transparent onPress={handleSubmit} disabled={!isValid}>
                  <Text style={styles.savetxt}>save</Text>
                </Button>
              </Right>
            </Header>
            <ScrollView>
              <View style={styles.component}>
                <View>
                  <View style={styles.userBio}>
                    <Image
                      style={styles.image}
                      source={
                        user.data.photo
                          ? {uri: `${API_URL}${user.data.photo}`}
                          : avatar
                      }
                    />
                    <TouchableOpacity onPress={takePicture}>
                      <Text style={styles.pick}>Choose Image</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Form>
                    <Item floatingLabel>
                      <Label>Username</Label>
                      <Input
                        onChangeText={handleChange('userName')}
                        onBlur={handleBlur('userName')}
                        value={values.userName}
                      />
                    </Item>
                    {touched.userName && errors.userName && (
                      <Text style={styles.textError}>{errors.userName}</Text>
                    )}
                    <Item floatingLabel>
                      <Label>email</Label>
                      <Input
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                    </Item>
                    {touched.email && errors.email && (
                      <Text style={styles.textError}>{errors.email}</Text>
                    )}
                    <Item floatingLabel>
                      <Label>gender</Label>
                      <Input
                        value={values.gender}
                        onChangeText={handleChange('gender')}
                        onBlur={handleBlur('gender')}
                      />
                    </Item>
                    {touched.gender && errors.gender && (
                      <Text style={styles.textError}>{errors.gender}</Text>
                    )}
                    <Item floatingLabel last>
                      <Label>birth</Label>
                      <Input
                        value={values.birth}
                        onChangeText={handleChange('birth')}
                        onBlur={handleBlur('birth')}
                      />
                    </Item>
                    <Item floatingLabel>
                      <Label>password</Label>
                      <Input value={user.data.password} />
                    </Item>
                  </Form>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </Formik>
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
  textError: {
    fontSize: 10,
    color: 'red',
  },
});
