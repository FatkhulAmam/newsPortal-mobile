import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Header, Left, Body, Text, Right, Button, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'

import profile from '../../assets/images/user.png'

const Profile = ({ navigation }) => {
    return (
        <>
            <Header style={styles.header} transparent>
                <Right>
                    <Button transparent>
                        <Icon name='search' size={22} />
                    </Button>
                </Right>
            </Header>
            <Card style={styles.parent} transparent>
                <View style={styles.userBio}>
                    <Image style={styles.image} source={profile} />
                    <Text style={styles.name}>yudha keling</Text>
                    <Left />
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                        <Text style={styles.edit}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </Card>
            <Card style={styles.cardWrite}>
                <Text>Tulis redaksi pertama Anda</Text>
                <Text note>jadi profesional dan melampauinya</Text>
                <Button style={styles.btnWrite} onPress={() => navigation.navigate("AddNews")} block>
                    <Text style={styles.btntext}>Write</Text>
                </Button>
            </Card>
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    parent: {
        padding: 10,
        backgroundColor: '#FFFFFF'
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
    userBio: {
        flexDirection: "row",
        marginTop: 25,
        marginBottom: 20
    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 50
    },
    identity: {
        paddingLeft: 15
    },
    name: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    card: {
        flexDirection: 'row'
    },
    edit: {
        marginRight: 15,
        color: '#C10000'
    },
    cardWrite: {
        backgroundColor: '#FFFFFF',
        height: 150,
        marginLeft: 50,
        marginRight: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    btnWrite: {
        marginTop: 10,
        marginLeft: 50,
        marginRight: 50
    }
})
