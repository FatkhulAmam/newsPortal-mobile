import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import {
  Text,
  Header,
  Form,
  Label,
  Textarea,
  Body,
  Right,
  Button,
  Title,
  Input,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {API_URL} from '@env';
import {Formik} from 'formik';
import * as yup from 'yup';

import Icon from 'react-native-vector-icons/FontAwesome';

import {updateNewsAction, getDetail} from '../../redux/actions/news';

const FormValidation = yup.object().shape({
  judul: yup.string().required('Judul diperlukan'),
  category: yup.number().required('Masukkan category berita'),
  description: yup.string().required('Masukkan isi berita'),
});

const options = {
  title: 'Select Picture',
};

const AddNews = ({navigation, route}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const newsIndex = useSelector((state) => state.news);
  const detailNews = useSelector((state) => state.news.detailNews);
  const [NewsImage, setNewsImage] = useState({
    uri: `${API_URL}${detailNews.picture}`,
  });
  const [dataImage, setDataImage] = React.useState(
    `${API_URL}${detailNews.photo}`,
  );

  useEffect(() => {
    dispatch(getDetail(token, route.params));
  }, [dispatch, route.params, token]);

  const updateHotNews = async (data) => {
    await dispatch(updateNewsAction(token, data));
    if (newsIndex.isUpdated === false) {
      Alert.alert(newsIndex.message);
    } else {
      Alert.alert(newsIndex.message);
      navigation.navigate('MainApp');
    }
  };

  const pickImage = () => {
    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setNewsImage({uri: response.uri});
        await setDataImage({
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        });
      }
    });
  };

  return (
    <>
      {newsIndex.isLoading === false ? (
        <Formik
          validationSchema={FormValidation}
          initialValues={{
            judul: detailNews.headline,
            category: detailNews.category,
            description: detailNews.description,
          }}
          onSubmit={(values) => updateHotNews(values)}>
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
                  <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name="times" size={22} />
                  </Button>
                  <Body>
                    <Title style={styles.text}>Hottes news</Title>
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={handleSubmit}
                      disabled={!isValid}>
                      <Text style={styles.pushtxt}>publish</Text>
                    </Button>
                  </Right>
                </Header>
              </View>
              <ScrollView>
                <View style={styles.parent}>
                  <Form>
                    <Label style={styles.label}>Upload Gambar</Label>
                    {NewsImage === '' ? (
                      <TouchableOpacity onPress={pickImage}>
                        <View style={styles.InputImage}>
                          <Icon name="cloud-upload" size={50} color="#8e8e8e" />
                          <Text note>upload file dari penyimpanan</Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={pickImage}>
                        <Image style={styles.newsImage} source={NewsImage} />
                      </TouchableOpacity>
                    )}
                    <Input
                      name="judul"
                      placeholder="Masukkan judul"
                      style={styles.inputText}
                      onChangeText={handleChange('judul')}
                      onBlur={handleBlur('judul')}
                      value={values.judul}
                    />
                    {touched.judul && errors.judul && (
                      <Text style={styles.textError}>{errors.judul}</Text>
                    )}
                    <Input
                      name="category"
                      placeholder="Masukkan category"
                      style={styles.inputText}
                      onChangeText={handleChange('category')}
                      onBlur={handleBlur('category')}
                      value={values.category}
                    />
                    {touched.category && errors.category && (
                      <Text style={styles.textError}>{errors.category}</Text>
                    )}
                    <Textarea
                      bordered
                      style={styles.descriptionArea}
                      placeholder="description"
                      name="description"
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                    />
                    {touched.description && errors.description && (
                      <Text style={styles.textError}>{errors.description}</Text>
                    )}
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
          animating={newsIndex.isLoading}
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
    marginLeft: 10,
  },
  parent: {
    padding: 10,
  },
  InputImage: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#9ea0a5',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 1,
    position: 'relative',
    height: 200,
  },
  newsImage: {
    height: 200,
    width: '100%',
  },
  pushtxt: {
    color: '#A10000',
  },
  imageContent: {
    alignItems: 'flex-end',
  },
  image: {
    backgroundColor: '#e8e8e8',
    width: 340,
    height: 250,
  },
  add: {
    marginTop: 15,
    backgroundColor: '#a10000',
    color: '#ffffff',
    borderRadius: 50,
    padding: 7,
  },
  textError: {
    fontSize: 10,
    color: '#FF0D10',
    fontStyle: 'italic',
  },
  inputText: {
    borderBottomWidth: 1,
    borderBottomColor: '#9ea0a5',
  },
  publish: {
    marginTop: 25,
    borderRadius: 25,
    backgroundColor: '#A00000',
  },
  descriptionArea: {
    width: '100%',
    height: 200,
  },
  parentsLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
