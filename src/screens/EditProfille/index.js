import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Header, Text, Form, Item, Input, Label, Body, Right, Button, Title } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker';
import { API_URL } from '@env'

import { getProfile } from '../../redux/actions/profile'

const EditProfile = () => {
    const user = useSelector(state=>state.profile)
    const token = useSelector(state=>state.auth.token)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProfile(token))
    },[dispatch, token])

    const [Photo, setPhoto] = useState(`${API_URL}${user.data.photo}`)

    const choosePhotoGalery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
          }).then(image => {
              setPhoto(Photo.path)
          });
    }

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
                    {Object.keys(user.data).length && (
                        <View style={styles.component}>
                            <View>
                                <View style={styles.userBio}>
                                    <Image style={styles.image} source={{uri: Photo}} />
                                    <TouchableOpacity onPress={choosePhotoGalery}>
                                        <Text style={styles.pick}>Choose Image</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Form>
                                    <Item floatingLabel>
                                        <Label>Username</Label>
                                        <Input value={user.data.name} />
                                    </Item>
                                    <Item floatingLabel >
                                        <Label>email</Label>
                                        <Input value={user.data.email}/>
                                    </Item>
                                    <Item floatingLabel >
                                        <Label>password</Label>
                                        <Input value={user.data.password} />
                                    </Item>
                                    <Item floatingLabel>
                                        <Label>gender</Label>
                                        <Input value={user.data.gender} />
                                    </Item>
                                    <Item floatingLabel last>
                                        <Label>birth</Label>
                                        <Input value={user.data.birth_date} />
                                    </Item>
                                </Form>
                            </View>
                        </View>
                    )}
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
        height: 100,
        width: 100,
        borderRadius: 50
    },
    pick: {
        color: '#A10000',
        marginTop: 20
    }
})
