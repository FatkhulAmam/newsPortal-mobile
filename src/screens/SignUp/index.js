import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import {
    Button, Header, Left, Body,
    Right, Card, CardItem,
    Form, Item, Input
} from 'native-base';


import Icon from 'react-native-vector-icons/FontAwesome'

const SignUp = ({navigation}) => {
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
            <View>
                <Text style={styles.text}>Sign Up</Text>
            </View>
            <View style={styles.register}>
                <Form>
                    <Card>
                        <CardItem>
                            <Body>
                                <Item style={styles.input}>
                                    <Input placeholder="name" />
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body>
                                <Item style={styles.input}>
                                    <Input placeholder="email" />
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body>
                                <Item style={styles.input}>
                                    <Input placeholder="password" />
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                        <TouchableOpacity>
                    <Text style={styles.textLogin} onPress={()=>navigation.navigate("Login")}>
                        Already have a account?
                        <Icon name="long-arrow-right" size={15} color="green" />
                    </Text>
                    </TouchableOpacity>
                    <Button style={styles.btnLogin} block>
                        <Text style={styles.btntext}>SIGN UP</Text>
                    </Button>
                </Form>
            </View>
        </View>
    )
}

export default SignUp

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
        backgroundColor: 'green'
    },
    btntext: {
        color: "#FFFFFF",
    }
})
