import React, {Component} from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {Card, CardItem, Body, Text} from 'native-base';
import DefaultImage from '../assets/images/default.png';

export default class CardImage extends Component {
  render() {
    return (
      <TouchableOpacity key="uniqueId1" onPress={this.props.moveDetail}>
        <Card transparent style={styles.newscard}>
          <CardItem>
            <Body>
              <Image
                style={styles.cardImage}
                source={
                  this.props.image !== ''
                    ? {uri: this.props.image}
                    : DefaultImage
                }
              />
              <Text style={styles.headline}>{this.props.headline}</Text>
              <View style={styles.about}>
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
    width: '100%',
    height: 200,
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
