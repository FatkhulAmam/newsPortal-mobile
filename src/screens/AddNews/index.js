import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Container, Header, Form, Item, Input, Label, Textarea, Body, Right, Button, Title } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome'

const AddNews = ({ navigation }) => {
    return (
        <>
            <View>
                <Header style={styles.header} transparent>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name='times' size={22} />
                    </Button>
                    <Body>
                        <Title style={styles.text}>Hottes news</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => navigation.navigate("Search")}>
                            <Icon name='search' size={20} />
                        </Button>
                    </Right>
                </Header>
            </View>
            <View>
                <Form>
                    <Item stackedLabel>
                        <Label>Headline</Label>
                        <Input />
                    </Item>
                    <Item stackedLabel last>
                        <Label>Category</Label>
                        <Input />
                    </Item>
                    <Textarea rowSpan={5} bordered placeholder="description" />
                </Form>
            </View>
        </>
    )
}

export default AddNews

const styles = StyleSheet.create({
    text: {
        color: '#000000',
        marginLeft: 10
    }
})
