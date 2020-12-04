import React from 'react';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import {Header, Body, Right, Button, Title, Text, Left} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {API_URL} from '@env';

import {getDetail} from '../../redux/actions/news';

class Detail extends React.Component {
  componentDidMount() {
    this.props.getDetail(this.props.auth.token, 1);
    console.log(this.props.id);
  }

  render() {
    const item = this.props.news.data;
    return (
      <>
        <Header style={styles.header} transparent>
          <Body>
            <Title style={styles.text}>Maos News</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Search')}>
              <Icon name="search" size={20} />
            </Button>
          </Right>
        </Header>
        <View style={styles.parent}>
          {Object.keys(item).length && (
            <ScrollView>
              <Image
                style={styles.image}
                source={{uri: `${API_URL}${item[0].picture}`}}
              />
              <View style={styles.titleContain}>
                <Text style={styles.title}>{item[0].headline}</Text>
                <View style={styles.about}>
                  <Text>{item[0].author.name}</Text>
                  <Left />
                  <Text note>{item[0].createdAt}</Text>
                </View>
                <Text>{item[0].description}</Text>
              </View>
            </ScrollView>
          )}
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
  auth: state.auth,
});
const mapDispatchToProps = {
  getDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
  },
  parent: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  image: {
    backgroundColor: '#F0F0F0',
    width: 360,
    height: 250,
  },
  titleContain: {
    padding: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  about: {
    marginTop: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    paddingBottom: 10,
    marginBottom: 10,
  },
});
