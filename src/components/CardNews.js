import React, {Component} from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {Card, CardItem, Body, Text, Left} from 'native-base';

export default class CardImage extends Component {
  render() {
    return (
      <TouchableOpacity key="uniqueId1" onPress={this.showDetail}>
        <Card transparent>
          <CardItem>
            <Body>
              <Image
                style={styles.cardImage}
                source={{uri: this.props.image}}
              />
              <Text style={styles.headline}>{this.props.headline}</Text>
              <View style={styles.about}>
                <Text>{this.props.authos}</Text>
                <Left />
                <Text note>{this.props.createdAt}</Text>
              </View>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  cardImage: {
    width: 300,
    height: 175,
    backgroundColor: '#E8E8E8',
  },
  headline: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  about: {
    flexDirection: 'row',
  },
});
