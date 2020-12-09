import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {Header, Body, Right, Button, Title} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {API_URL} from '@env';
import moment from 'moment';

import {getNews} from '../../redux/actions/news';
import CardNews from '../../components/CardNews';

class Home extends React.Component {
  componentDidMount() {
    this.props.getNews(this.props.auth.token);
  }

  render() {
    const {isLoading, data} = this.props.news;
    return (
      <>
        <Header style={styles.header} transparent>
          <StatusBar backgroundColor={'#A00000'} />
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
        {isLoading === true ? (
          <ActivityIndicator
            size="large"
            color="#A00000"
            animating={isLoading}
            style={styles.indicator}
          />
        ) : (
          <View style={styles.parent}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <CardNews
                  headline={item.headline}
                  author={item.author.name}
                  createdAt={moment(item.createdAt).format('MMMM Do YYYY')}
                  image={`${API_URL}${item.picture}`}
                  moveDetail={() =>
                    this.props.navigation.navigate('NewsDetail', item.id)
                  }
                />
              )}
            />
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
  auth: state.auth,
});
const mapDispatchToProps = {
  getNews,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
  },
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
