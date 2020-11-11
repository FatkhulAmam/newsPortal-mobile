import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Container, Header, Text, Form, Item, Input, Label, Body, Right, Button, Title } from 'native-base';
import { RadioButton } from 'react-native-paper';

import profile from '../../assets/images/user.png'

const EditProfile = ({ navigation }) => {
    const [checked, setChecked] = React.useState('first');
    return (
        <>
            <View style={styles.parent}>
                <Header transparent>
                    <Body>
                        <Title style={styles.text}>Edit profile</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => navigation.navigate("Profile")}>
                            <Text style={styles.savetxt}>save</Text>
                        </Button>
                    </Right>
                </Header>
                <ScrollView>
                    <View style={styles.component}>
                        <View>
                            <View style={styles.userBio}>
                                <Image style={styles.image} source={profile} />
                                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                                    <Text style={styles.pick}>Choose Image</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Form>
                                <Item floatingLabel>
                                    <Label>Username</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel >
                                    <Label>email</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel >
                                    <Label>password</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>gender</Label>
                                    <Input />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>birth</Label>
                                    <Input />
                                </Item>
                            </Form>
                        </View>
                    </View>
                </ScrollView>
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
    text: {
        color: '#000000',
    },
    savetxt: {
        color: '#A10000'
    },
    component: {
        margin: 20
    },
    userBio: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 50
    },
    pick: {
        color: '#A10000',
        marginTop: 20
    }
})
