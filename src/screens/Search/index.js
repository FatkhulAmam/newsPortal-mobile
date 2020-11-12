import React from 'react'
import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Header, Left, Text, Button, Body, Card, CardItem } from 'native-base'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/FontAwesome'
import { getSearch } from '../../redux/actions/search'
const url = 'http://192.168.43.70:8080'

class Search extends React.Component {
    state = {
        keyword: ''
    }
    searchNews = () => {
        const { keyword } = this.state
        this.props.getSearch(keyword)
    }

    render() {
        const { isLoading, data, isError, message } = this.props.search
        return (
            <>
                <Header style={styles.header} transparent>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name='angle-left' size={30} />
                    </Button>
                    <Body>
                        <View style={{ position: 'relative' }}>
                            <TextInput style={styles.search} placeholder="Search" onChangeText={keyword => this.setState({ keyword })} />
                            <TouchableOpacity style={styles.icon}>
                                <Icon name="search" size={20} onPress={this.searchNews}/>
                            </TouchableOpacity>
                        </View>
                    </Body>
                </Header><View style={styles.parent}>
                    <ScrollView>
                        {!isLoading && !isError && data.length !== 0 && data.map(item => {
                            return (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('NewsDetail')}>
                                    <Card>
                                        <CardItem>
                                            <Body>
                                                <Image style={styles.cardImage} source={`${url}${item.picture}`} />
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
                            )
                        })}
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
    search: state.search
})
const mapDispatchToProps = {
    getSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)

const styles = StyleSheet.create({
    search: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: "#C8C8C8",
        borderRadius: 50,
        paddingLeft: 35,
        fontSize: 20,
        marginLeft: 13,
        marginTop: 5
    },
    icon: {
        color: '#a3a3a3',
        position: 'absolute',
        top: 14,
        left: 23,
    },
    parent: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 95
    },
    cardImage: {
        width: 300,
        height: 175
    },
    headline: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    about: {
        flexDirection: 'row'
    }
})
