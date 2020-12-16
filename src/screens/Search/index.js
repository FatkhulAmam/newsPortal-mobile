import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {Header, Button, Body} from 'native-base';
import {connect} from 'react-redux';
import {API_URL} from '@env';
import moment from 'moment';

import Icon from 'react-native-vector-icons/FontAwesome';
import {getSearch} from '../../redux/actions/news';
import CardNews from '../../components/CardNews';

class Search extends React.Component {
  state = {
    keyword: '',
  };
  searchNews = () => {
    const {keyword} = this.state;
    this.props.getSearch(this.props.token, keyword);
  };

  render() {
    const {isLoading, data} = this.props.search;
    return (
      <>
        <Header style={styles.header} transparent>
          <StatusBar backgroundColor={'#A00000'} />
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="angle-left" size={30} />
          </Button>
          <Body>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.search}
                placeholder="Search"
                onChangeText={(keyword) => this.setState({keyword})}
              />
              <TouchableOpacity style={styles.icon}>
                <Icon name="search" size={20} onPress={this.searchNews} />
              </TouchableOpacity>
            </View>
          </Body>
        </Header>
        {isLoading === false ? (
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
        ) : (
          <ActivityIndicator
            size="large"
            color="#A00000"
            animating={isLoading}
            style={styles.indicator}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  search: state.search,
  token: state.auth.token,
});
const mapDispatchToProps = {
  getSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
  search: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    borderRadius: 50,
    paddingLeft: 15,
    fontSize: 20,
    marginLeft: 13,
    marginTop: 5,
  },
  searchContainer: {
    position: 'relative',
  },
  icon: {
    color: '#a3a3a3',
    position: 'absolute',
    top: 14,
    right: 20,
  },
  parent: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 95,
  },
  cardImage: {
    width: 300,
    height: 175,
  },
  headline: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  about: {
    flexDirection: 'row',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
