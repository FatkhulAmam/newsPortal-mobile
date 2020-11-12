import React, { Component } from 'react'
import { StyleSheet, Picker, View, ScrollView, Alert } from 'react-native'
import { Text, Header, Form, Item, Label, Textarea, Body, Right, Button, Title, Input } from 'native-base';
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/FontAwesome'

import {getCategory} from '../../redux/actions/category'
import {makeNewsAction} from '../../redux/actions/addNews'

class AddNews extends Component {
    state = {
        headline: '',
        category: '',
        description: '',
        message: ''
    }

    makeNews = () => {
        const { headline, category, description } = this.state
        const data = {
            author_id: '1',
            headline: headline,
            category: category,
            description: description
        }
        this.props.makeNewsAction(data)
    }
    
    showAlert = () => {
        const { message } = this.props.addNews
        if (message !== this.state.message) {
            this.setState({ message })
            Alert.alert(message)
        }
    }

    componentDidMount() {
        this.props.getCategory()
    }

    render() {
        return (
            <>
                <View>
                    <Header style={styles.header} transparent>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='times' size={22} />
                        </Button>
                        <Body>
                            <Title style={styles.text}>Hottes news</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={this.makeNews}>
                                <Text style={styles.pushtxt}>publish</Text>
                            </Button>
                        </Right>
                    </Header>
                </View>
                <View style={styles.parent}>
                    <ScrollView>
                        <Form>
                            <Item floatingLabel last>
                                <Label>Headline</Label>
                                <Input onChangeText={headline => this.setState({ headline })}/>
                            </Item>
                            <Item floatingLabel last>
                                <Label>Category</Label>
                                <Input onChangeText={category => this.setState({ category })}/>
                            </Item>
                            {/* <View style={styles.container}>
                                <Picker
                                    selectedValue={selectedValue}
                                    style={styles.picker}
                                    onValueChange={(itemValue, itemIndex) => this.setState(itemValue)}
                                >
                                    <Picker.Item label='category' />
                                    <Picker.Item label="JavaScript" value="js" />
                                </Picker>
                            </View> */}
                            <Textarea rowSpan={16} bordered placeholder="description" onChangeText={description => this.setState({ description })}/>
                        </Form>
                    </ScrollView>
                </View>
            </>
        )
    }
}

const mapStateToProps = state => ({
    category: state.category,
    addNews: state.addNews
})
const mapDispatchToProps = {
    getCategory,
    makeNewsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNews)

const styles = StyleSheet.create({
    text: {
        color: '#000000',
        marginLeft: 10
    },
    parent: {
        padding: 10
    },
    pushtxt: {
        color: '#A10000'
    }
})
