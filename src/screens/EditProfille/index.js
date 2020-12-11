import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {
  Text,
  Header,
  Form,
  Body,
  Right,
  Button,
  Title,
  Item,
  Input,
  Label,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {API_URL} from '@env';
import {Formik} from 'formik';
import * as yup from 'yup';

import {updateProfile, getProfile} from '../../redux/actions/profile';
import ProfileDefault from '../../assets/images/avatar.png';

const FormValidation = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
  gender: yup.string(),
  birth: yup.string(),
});

const options = {
  title: 'Select Picture',
};

const showToastImg = () => {
  ToastAndroid.showWithGravity(
    'Not an image (jpg/jpeg/png)',
    ToastAndroid.LONG,
    ToastAndroid.CENTER,
  );
};

const showToastSize = () => {
  ToastAndroid.showWithGravity(
    'image to large(under 500kb)',
    ToastAndroid.LONG,
    ToastAndroid.CENTER,
  );
};

const AddNews = ({navigation, route}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.data);
  const userIndex = useSelector((state) => state.profile);
  const [avatar, setAvatar] = useState(
    user.photo ? {uri: `${API_URL}${user.photo}`} : ProfileDefault,
  );
  const [dataImage, setDataImage] = React.useState();

  const takePicture = () => {
    ImagePicker.showImagePicker(options, async (response) => {
      console.log(response.fileSize);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.fileSize <= 500 * 500) {
          if (
            `${response.type}` === 'image/jpg' ||
            'image/jpeg' ||
            'image/png'
          ) {
            setAvatar({uri: response.uri});
            await setDataImage({
              uri: response.uri,
              name: response.fileName,
              type: response.type,
            });
          } else {
            showToastImg();
          }
        } else {
          showToastSize();
        }
      }
    });
  };

  const profileData = async (data, img) => {
    const form = new FormData();
    form.append('name', data.name);
    form.append('email', data.email);
    form.append('gender', data.gender);
    form.append('birth_date', data.birth);
    form.append('pictures', img);
    await dispatch(updateProfile(token, form));
    if (user.isUpdated === false) {
      Alert.alert(userIndex.message);
    } else {
      Alert.alert(userIndex.message);
      navigation.navigate('MainApp');
    }
    return dispatch(getProfile(token));
  };

  return (
    <>
      {userIndex.isLoading === false ? (
        <Formik
          validationSchema={FormValidation}
          initialValues={{
            name: user.name,
            email: user.email,
            gender: user.gender,
            birth: user.birth_date,
          }}
          onSubmit={(values) => profileData(values, dataImage)}>
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
              <View>
                <Header style={styles.header} transparent>
                  <StatusBar backgroundColor={'#A00000'} />
                  <Body>
                    <Title style={styles.text}>Edit My Profile</Title>
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={handleSubmit}
                      disabled={!isValid}>
                      <Text style={styles.savetxt}>SAVE</Text>
                    </Button>
                  </Right>
                </Header>
              </View>
              <ScrollView>
                <View style={styles.parent}>
                  <Form>
                    <View>
                      <View style={styles.userBio}>
                        <Image style={styles.image} source={avatar} />
                        <TouchableOpacity onPress={takePicture}>
                          <Text style={styles.pick}>Choose Image</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
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
              </ScrollView>
            </SafeAreaView>
          )}
        </Formik>
      ) : (
        <ActivityIndicator
          size="large"
          color="#A00000"
          animating={userIndex.isLoading}
          style={styles.parentsLoading}
        />
      )}
    </>
  );
};

export default AddNews;

const styles = StyleSheet.create({
  text: {
    color: '#000000',
  },
  parent: {
    paddingRight: 10,
  },
  imageContent: {
    alignItems: 'flex-end',
  },
  savetxt: {
    color: '#A10000',
  },
  textError: {
    fontSize: 10,
    color: '#FF0D10',
    fontStyle: 'italic',
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
  parentsLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
