import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  SafeAreaView,
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

import {getProfile, updateProfile} from '../../redux/actions/profile';
import ProfileDefault from '../../assets/images/avatar.png';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const editProfileValidation = yup.object().shape({
  name: yup.string(),
  email: yup.string().email('Masukkan alamat email dengan benar'),
  gender: yup.string(),
  birth: yup.number(),
});

const EditProfile = ({navigation}) => {
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

  const profileData = async (data, img) => {
    const form = new FormData();
    form.append('name', data.name);
    form.append('email', data.email);
    form.append('gender', data.gender);
    form.append('birth_date', data.birth);
    form.append('photo', img);
    await dispatch(updateProfile(form));
    if (user.isUpdated === false) {
      Alert.alert(user.message);
    } else {
      Alert.alert(user.message);
      navigation.navigate('MainApp');
    }
  };

  return (
    <>
      <Formik
        validationSchema={editProfileValidation}
        initialValues={{
          name: user.data.name,
          email: user.data.email,
          gender: user.data.gender,
          birth: user.data.birth_date,
        }}
        onSubmit={(values) => console.log(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <SafeAreaView>
            <View style={styles.parent}>
              <Header transparent>
                <StatusBar backgroundColor={'#A00000'} />
                <Body>
                  <Title style={styles.text}>Edit profile</Title>
                </Body>
                <Right>
                  <Button
                    transparent
                    onPress={handleSubmit}
                    disabled={!isValid}>
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
                          name="name"
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          value={values.name}
                        />
                      </Item>
                      {touched.name && errors.name && (
                        <Text style={styles.textError}>{errors.name}</Text>
                      )}
                      <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          keyboardType="email-address"
                        />
                      </Item>
                      {touched.email && errors.email && (
                        <Text style={styles.textError}>{errors.email}</Text>
                      )}
                      <Item floatingLabel>
                        <Label>gender</Label>
                        <Input
                          name="gender"
                          value={values.gender}
                          onChangeText={handleChange('gender')}
                          onBlur={handleBlur('gender')}
                        />
                      </Item>
                      {touched.gender && errors.gender && (
                        <Text style={styles.textError}>{errors.gender}</Text>
                      )}
                      <Item floatingLabel>
                        <Label>birth</Label>
                        <Input
                          name="birth"
                          value={values.birth}
                          onChangeText={handleChange('birth')}
                          onBlur={handleBlur('birth')}
                        />
                        {touched.birth && errors.birth && (
                          <Text style={styles.textError}>{errors.birth}</Text>
                        )}
                      </Item>
                    </Form>
                  </View>
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
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
