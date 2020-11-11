import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Container, Header, Text, Form, Item, Input, Label, Body, Right, Button, Title } from 'native-base';
import { RadioButton } from 'react-native-paper';

import profile from '../../assets/images/user.png'

import { getProfile } from '../../redux/actions/profile'

class EditProfile extends React.Component {
    componentDidMount() {
        this.props.getProfile()
    }

    render() {
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
                        {!isLoading && !isError && data.length !== 0 && data.map(item => {
                            return (
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
                                                <Input value={item.name} />
                                            </Item>
                                            <Item floatingLabel >
                                                <Label>email</Label>
                                                <Input />
                                            </Item>
                                            <Item floatingLabel >
                                                <Label>password</Label>
                                                <Input value={item.password} />
                                            </Item>
                                            <Item floatingLabel last>
                                                <Label>gender</Label>
                                                <Input value={item.gender} />
                                            </Item>
                                            <Item floatingLabel last>
                                                <Label>birth</Label>
                                                <Input value={item.birth} />
                                            </Item>
                                        </Form>
                                    </View>
                                </View>
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
    profile: state.profile
})
const mapDispatchToProps = {
    getProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)

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
