import React, {Component} from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import {
    Button, Header, Left, Body,
    Right, Card, CardItem,
    Form, Item, Input, Label
} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome'

const Login = ({navigation}) => {
    return (
        <View style={styles.parent}>
            <View>
                <Header transparent>
                    <Left>
                        <Button transparent onPress={()=> this.props.navigation.goBack()}>
                            <Icon name='angle-left' size={30} />
                        </Button>
                    </Left>
                    <Right />
                </Header>
            </View>
            <View>
                <Text style={styles.text}>Login</Text>
            </View>
            <View style={styles.register}>
                <Form>
                    <Card>
                        <CardItem>
                            <Body>
                                <Item style={styles.input} floatingLabel>
                                    <Label style={styles.label}>email</Label>
                                    <Input onChangeText={email=>this.setState({email})}/>
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body>
                                <Item style={styles.input} floatingLabel>
                                    <Label style={styles.label}>Password</Label>
                                    <Input onChangeText={password=>this.setState({password})}/>
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    <Text style={styles.textLogin}>Forgot your password <Icon name="long-arrow-right" size={15} color="#A00000" /></Text>
                    <Button style={styles.btnLogin} onPress={()=>navigation.navigate("MainApp")} block>
                        <Text style={styles.btntext}>LOGIN</Text>
                    </Button>
                </Form>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    text: {
        paddingLeft: 15,
        fontSize: 40,
        fontWeight: "bold"
    },
    register: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 50
    },
    input: {
        height: 40,
    },
    label:{
        bottom: 5
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
        backgroundColor: '#A00000',
    },
    btntext: {
        color: "#FFFFFF",
    }
})
