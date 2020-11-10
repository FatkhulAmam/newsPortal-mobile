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
            <View style={styles.parent}>
                <Text style={styles.tittle}>My Profile</Text>
                <View style={styles.userBio}>
                    <Image style={styles.image} source={profile} />
                    <View style={styles.identity}>
                        <Text style={styles.name}>yudha keling</Text>
                        <Text note>yudkelgtg@mail.com</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('MyOrder')}>
                        <Card transparent>
                            <CardItem>
                                <Body style={styles.card}>
                                    <View>
                                        <Text>My Orders</Text>
                                        <Text note>Already have an order</Text>
                                    </View>
                                    <Right />
                                    <Icon name="angle-right" size={22} color="#8f8f8f" />
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ShippingAddress')}>
                        <Card transparent>
                            <CardItem>
                                <Body style={styles.card}>
                                    <View>
                                        <Text>Shipping Address</Text>
                                        <Text note>3 Address</Text>
                                    </View>
                                    <Right />
                                    <Icon name="angle-right" size={22} color="#8f8f8f" />
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                        <Card transparent>
                            <CardItem>
                                <Body style={styles.card}>
                                    <View>
                                        <Text>Setting</Text>
                                        <Text note>Account setting</Text>
                                    </View>
                                    <Right />
                                    <Icon name="angle-right" size={22} color="#8f8f8f" />
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Card transparent>
                            <CardItem>
                                <Body style={styles.card}>
                                    <View>
                                        <Text>Log Out</Text>
                                        <Text note>Account setting</Text>
                                    </View>
                                    <Right />
                                    <Icon name="angle-right" size={22} color="#8f8f8f" />
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    parent: {
        padding: 10
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
        fontSize: 30,
        fontWeight: 'bold'
    },
    card: {
        flexDirection: 'row'
    }
})
