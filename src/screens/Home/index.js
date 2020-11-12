import React from 'react'
import { StyleSheet, Image, View, ScrollView, TouchableOpacity } from 'react-native'
import { Card, CardItem, Header, Body, Right, Button, Title, Text, Left } from 'native-base';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { API_URL } from '@env'

import { getNews } from '../../redux/actions/news'

class Home extends React.Component {
    componentDidMount() {
        this.props.getNews()
    }

    showDetail = () => {
        this.props.navigation.navigate("NewsDetail")
        console.log(this.props.news.data[0].id);
    }

    render() {
        const { isLoading, data, isError, message } = this.props.news
        return (
            <>
                <Header style={styles.header} transparent>
                    <Body>
                        <Title style={styles.text}>Maos News</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate("Search")}>
                            <Icon name='search' size={20} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.parent}>
                    <ScrollView>
                    {!isLoading && !isError && data.length !== 0 && data.map(item => {
                        return (
                                <TouchableOpacity key="uniqueId1" onPress={this.showDetail}>
                                    <Card>
                                        <CardItem>
                                            <Body>
                                                <Image style={styles.cardImage} source={{uri:`${API_URL}${item.picture}`}}/>
                                                <Text style={styles.headline}>{item.headline}</Text>
                                                <View style={styles.about}>
                                                    <Text>{item.author.name}</Text>
                                                    <Left />
                                                    <Text note>{item.createdAt}</Text>
                                                </View>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </TouchableOpacity>
                        )})}
                    </ScrollView>
                {isLoading && !isError && (
                    <Text>Loading</Text>
                )}
                {isError && message !== '' && (
                    <Text>{message}</Text>
                )}
                </View>
            </>
        )
    }
}

const mapStateToProps = state => ({
    news: state.news
})
const mapDispatchToProps = {
    getNews
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
    },
    text: {
        color: '#000000',
    },
    parent: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 95
    },
    cardImage: {
        width: 300,
        height: 175,
        backgroundColor: '#E8E8E8'
    },
    headline: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    about: {
        flexDirection: 'row'
    }
})

