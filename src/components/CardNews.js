import React, {Component} from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {Card, CardItem, Body, Text, Left} from 'native-base';
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
              <Text style={styles.preview}>
                {`${this.props.preview}${'....'}`}
                <Text style={styles.readWrap} note>
                  Readmore
                </Text>
              </Text>
              <View style={styles.about}>
                <Image source={this.props.userImg} style={styles.userImage} />
                <Text style={styles.author}>{this.props.author}</Text>
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
    alignItems: 'center',
    marginTop: 10,
  },
  author: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
});
