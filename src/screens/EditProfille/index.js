import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Container, Header, Text, Form, Item, Input, Label, Body, Right, Button, Title } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'

import profile from '../../assets/images/user.png'

const EditProfile = ({ navigation }) => {
    return (
        <>
            <View style={styles.parent}>
                <Header style={styles.header} transparent>
                    <Body>
                        <Title style={styles.text}>Edit profile</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => navigation.navigate("Profile")}>
                            <Text>save</Text>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.component}>
                    <Text>Edit Your Profile</Text>
                    <View>
                        <View style={styles.userBio}>
                            <Image style={styles.image} source={profile} />
                            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                                <Text style={styles.pick}>Choose an Image</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Form>
                            <Item floatingLabel>
                                <Label>Username</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel last>
                                <Label>About</Label>
                                <Input />
                            </Item>
                        </Form>
                    </View>
                </View>
            </View>
        </>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        backgroundColor: 'gray',
    },
    text: {
        color: '#000000',
    },
    component: {
        margin: 20
    },
    userBio: {
        flexDirection: "row",
        marginTop: 25,
        marginBottom: 20,
        alignItems: 'center'
    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 50
    },
    pick: {
        marginLeft: 25,
        color: '#C10000'
    }
})
