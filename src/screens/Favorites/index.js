import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Title } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome'

const Favorites = () => {
    return (
        <View>
            <Header style={styles.header}>
                <Body>
                    <Title style={styles.text}>Favorites Page</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name='search' size={20} />
                    </Button>
                </Right>
            </Header>
        </View>
    )
}

export default Favorites

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF'
    },
    text: {
        color: '#000000',
    }
})
