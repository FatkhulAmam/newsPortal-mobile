import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import {
    Button, Header, Left, Text,
    Right, Label,
    Form, Item, Input
} from 'native-base';
import LogoMaos from '../../assets/images/maos.svg' 

import Icon from 'react-native-vector-icons/FontAwesome'

const SignUp = ({ navigation }) => {
    return (
        <View style={styles.parent}>
            <View>
                <Header transparent>
                    <Left>
                        <Button transparent>
                            <Icon name='angle-left' size={30} />
                        </Button>
                    </Left>
                    <Right />
                </Header>
            </View>
            <View style={styles.header}>
                <LogoMaos />
                <Text style={styles.text}>Sign Up</Text>
            </View>
            <View style={styles.register}>
                <Form>
                    <Item floatingLabel >
                        <Label>Username</Label>
                        <Input style={styles.input}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input />
                    </Item>
                </Form>
                <Button style={styles.btnLogin} block>
                        <Text style={styles.btntext}>Sign Up</Text>
                </Button>
                <Button block transparent onPress={()=>navigation.navigate("Login")}>
                    <Text style={styles.loginTxt}>LOGIN</Text>
                </Button>
            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    header: {
        alignItems: 'center'
    },
    text: {
        marginTop: 25,
        fontSize: 40,
        fontWeight: "bold"
    },
    register: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20
    },
    input: {
        height: 40
    },
    textLogin: {
        fontSize: 17,
        textAlign: "right",
        marginRight: 15,
        marginTop: 10
    },
    btnLogin: {
        borderRadius: 25,
        marginTop: 25,
        backgroundColor: '#A00000'
    },
    btntext: {
        color: "#FFFFFF",
    },
    input: {
        color: "#A00000"
    },
    loginTxt: {
        color: '#A00000'
    }
})
