import React from 'react'
import { StyleSheet, Image, View, ScrollView, TouchableOpacity } from 'react-native'
import { Card, CardItem, Header, Body, Right, Button, Title, Text, Left } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'

const Home = ({ navigation }) => {
    return (
        <>
            <Header style={styles.header} transparent>
                <Body>
                    <Title style={styles.text}>Maos News</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => navigation.navigate("Search")}>
                        <Icon name='search' size={20} />
                    </Button>
                </Right>
            </Header>
            <View style={styles.parent}>
                <ScrollView>
                    <TouchableOpacity onPress={()=>navigation.navigate('NewsDetail')}>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Image style={styles.cardImage} />
                                    <Text style={styles.headline}>Judul Berite</Text>
                                    <View style={styles.about}>
                                        <Text>Penulis</Text>
                                        <Left />
                                        <Text note>20/10/2010</Text>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
    },
    text: {
        color: '#000000',
    },
    parent: {
        paddingLeft: 10,
        paddingRight: 10
    },
    cardImage: {
        backgroundColor: '#F0F0F0',
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

