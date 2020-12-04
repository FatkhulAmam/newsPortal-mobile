import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
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
import ImagePicker from 'react-native-image-crop-picker';

import Icon from 'react-native-vector-icons/FontAwesome';

import {getCategory} from '../../redux/actions/category';
import {makeNewsAction} from '../../redux/actions/news';

class AddNews extends Component {
  state = {
    headline: '',
    category: '',
    description: '',
    pictures: '',
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

  addNewsPicture = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 450,
      cropping: true,
    }).then((pictures) => {
      this.setState({pictures: pictures.path});
      console.log(pictures.path);
    });
  };

  componentDidMount() {
    this.props.getCategory();
  }

  render() {
    return (
      <>
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
        <View style={styles.parent}>
          <ScrollView>
            <Form>
              <View style={styles.imageContent}>
                <Image
                  style={styles.image}
                  source={{uri: this.state.pictures}}
                />
                <TouchableOpacity onPress={this.addNewsPicture}>
                  <Text style={styles.add}>add image</Text>
                </TouchableOpacity>
              </View>
              <Item floatingLabel last>
                <Label>Headline</Label>
                <Input onChangeText={(headline) => this.setState({headline})} />
              </Item>
              <Item floatingLabel last>
                <Label>Category</Label>
                <Input onChangeText={(category) => this.setState({category})} />
              </Item>
              {/* <View style={styles.container}>
                                <Picker
                                    selectedValue={selectedValue}
                                    style={styles.picker}
                                    onValueChange={(itemValue, itemIndex) => this.setState(itemValue)}
                                >
                                    <Picker.Item label='category' />
                                    <Picker.Item label="JavaScript" value="js" />
                                </Picker>
                            </View> */}
              <Textarea
                rowSpan={16}
                bordered
                placeholder="description"
                onChangeText={(description) => this.setState({description})}
              />
            </Form>
          </ScrollView>
        </View>
      </>
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
});
