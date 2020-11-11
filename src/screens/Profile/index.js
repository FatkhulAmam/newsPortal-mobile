import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Header, Left, Body, Text, Right, Button, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

import profile from '../../assets/images/user.png'

import { getProfile } from '../../redux/actions/profile'

class Profile extends React.Component {
    componentDidMount() {
        this.props.getProfile()
    }

    render() {
        return (
            <>
                <View style={styles.parent}>
                    <Header style={styles.header} transparent>
                        <Right>
                            <Button transparent>
                                <Icon name='search' size={22} />
                            </Button>
                        </Right>
                    </Header>
                    {!isLoading && !isError && data.length !== 0 && data.map(item => {
                        return (
                            <Card style={styles.bioCard} transparent>
                                <Image style={styles.image} source={profile} />
                                <Text style={styles.name}>{item.name}</Text>
                                <Text note>{item.email}</Text>
                                <Left />
                                <View style={styles.menu}>
                                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                                        <Text style={styles.edit}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => dispatch({ type: 'LOGOUT' })}>
                                        <Text style={styles.logoutTxt}>Logout</Text>
                                    </TouchableOpacity>
                                </View>
                            </Card>
                        )
                    })}
                    <Button tra block style={styles.btnNews} onPress={() => navigation.navigate('MyNews')}>
                        <Text>My News</Text>
                    </Button>
                </View>
                <Card style={styles.cardWrite} transparent>
                    <Text>Tulis redaksi Anda</Text>
                    <Text note>jadi profesional dan melampauinya</Text>
                    <Button style={styles.btnWrite} onPress={() => navigation.navigate("AddNews")} block>
                        <Text style={styles.btntext}>Write</Text>
                    </Button>
                </Card>
            </>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile
})
const mapDispatchToProps = {
    getProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
    parent: {
        backgroundColor: '#FFFFFF'
    },
    bioCard: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    },
    header: {
        backgroundColor: '#FFFFFF',
    },
    text: {
        color: '#000000',
    },
    tittle: {
        fontSize: 45,
        fontWeight: "bold"
    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 50,
        marginBottom: 10
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    menu: {
        flexDirection: 'row',
        marginTop: 10,
    },
    edit: {
        color: '#C10000',
        fontSize: 18,
        paddingRight: 25
    },
    logoutTxt: {
        fontSize: 18,
        color: '#C10000',
        paddingLeft: 25
    },
    cardWrite: {
        backgroundColor: '#e6e6e6',
        height: 150,
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    btnWrite: {
        backgroundColor: '#A10000',
        marginTop: 10,
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 25
    },
    btnNews: {
        backgroundColor: '#A10000'
    }
})
