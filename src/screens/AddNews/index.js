import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  Text,
  Header,
  Form,
  Item,
  Label,
  Textarea,
  Body,
  Right,
  Button,
  Title,
  Input,
} from 'native-base';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {Formik} from 'formik';
import * as yup from 'yup';

import Icon from 'react-native-vector-icons/FontAwesome';
import ImageDeafult from '../../assets/images/default.png';

import {getCategory} from '../../redux/actions/category';
import {makeNewsAction} from '../../redux/actions/news';

const FormValidation = yup.object().shape({
  judul: yup.string().required('Judul diperlukan'),
  description: yup.string().required('Masukkan isi berita'),
});

const options = {
  title: 'Select Picture',
};

class AddNews extends Component {
  state = {
    category: '',
    pictures: ImageDeafult,
    message: '',
  };

  makeNews = () => {
    const {headline, category, description} = this.state;
    const data = {
      headline: headline,
      category: category,
      description: description,
    };
    this.props.makeNewsAction(data, this.props.auth.token);
  };

  showAlert = () => {
    const {message} = this.props.addNews;
    if (message !== this.state.message) {
      this.setState({message});
      Alert.alert(message);
    }
  };

  pickImage = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        this.setState({
          pictures: source,
        });
      }
    });
  };

  componentDidMount() {
    this.props.getCategory();
  }

  render() {
    return (
      <SafeAreaView>
        <StatusBar backgroundColor={'#A00000'} />
        <View>
          <Header style={styles.header} transparent>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="times" size={22} />
            </Button>
            <Body>
              <Title style={styles.text}>Hottes news</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.makeNews}>
                <Text style={styles.pushtxt}>publish</Text>
              </Button>
            </Right>
          </Header>
        </View>
        <ScrollView>
          <View style={styles.parent}>
            <Formik
              validationSchema={FormValidation}
              initialValues={{
                judul: '',
                description: '',
              }}
              onSubmit={(values) => this.signUp(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <Form>
                  <View style={styles.imageContent}>
                    <Image
                      style={styles.image}
                      source={{uri: this.props.pictures}}
                    />
                    <TouchableOpacity onPress={this.pickImage}>
                      <Text style={styles.add}>add image</Text>
                    </TouchableOpacity>
                  </View>
                  <Item floatingLabel>
                    <Label>Headline</Label>
                    <Input
                      name="judul"
                      onChangeText={handleChange('judul')}
                      onBlur={handleBlur('judul')}
                      value={values.judul}
                    />
                  </Item>
                  {touched.judul && errors.judul && (
                    <Text style={styles.textError}>{errors.judul}</Text>
                  )}
                  <Item floatingLabel>
                    <Label>Category</Label>
                    <Input
                      onChangeText={(category) => this.setState({category})}
                    />
                  </Item>
                  <Label>Headline</Label>
                  <Textarea
                    style={styles.description}
                    bordered
                    placeholder="description"
                    name="description"
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                  />
                  {touched.description && errors.description && (
                    <Text style={styles.textError}>{errors.description}</Text>
                  )}
                  <Button style={styles.publish} onPress={handleSubmit} block>
                    <Text style={styles.btntext}>PUBLISH</Text>
                  </Button>
                </Form>
              )}
            </Formik>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.category,
  addNews: state.addNews,
  auth: state.auth,
});
const mapDispatchToProps = {
  getCategory,
  makeNewsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNews);

const styles = StyleSheet.create({
  text: {
    color: '#000000',
    marginLeft: 10,
  },
  parent: {
    padding: 10,
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
    marginLeft: 15,
    fontStyle: 'italic',
  },
  publish: {
    marginTop: 25,
    borderRadius: 25,
    backgroundColor: '#A00000',
  },
  description: {
    height: 150,
  },
});
