import React, {useState} from 'react';
import {StyleSheet, Picker, View, ScrollView} from 'react-native';
import {
  Text,
  Header,
  Form,
  Item,
  Input,
  Label,
  Textarea,
  Body,
  Right,
  Button,
  Title,
} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

const AddNews = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('amam');

  return (
    <>
      <View>
        <Header style={styles.header} transparent>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="times" size={22} />
          </Button>
          <Body>
            <Title style={styles.text}>Hottes news</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => navigation.navigate('Search')}>
              <Text style={styles.pushtxt}>publish</Text>
            </Button>
          </Right>
        </Header>
      </View>
      <View style={styles.parent}>
        <ScrollView>
          <Form>
            <Item stackedLabel>
              <Label>Headline</Label>
              <Input />
            </Item>
            <View style={styles.container}>
              <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                <Picker.Item label="category" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
            <Textarea rowSpan={16.7} bordered placeholder="description" />
          </Form>
        </ScrollView>
      </View>
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
  pushtxt: {
    color: '#A10000',
  },
});
