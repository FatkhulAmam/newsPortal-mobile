import React from 'react'
import { StyleSheet, Image, View, ScrollView } from 'react-native'
import { Card, CardItem, Header, Body, Right, Button, Title, Text, Left } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

import {getDetail} from '../../redux/actions/newsDetail'

class Detail extends React.Component {
    componentDidMount(id) {
        this.props.getDetail(id)
    }
    
    
    render() {
        return (
            <>
                <Header style={styles.header} transparent>
                    <Body>
                        <Title style={styles.text}>Maos News</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => navigation.navigate("Search")}>
                            <Icon name='search' size={20} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.parent}>
                    <ScrollView>
                        <Image style={styles.image} />
                        <View style={styles.titleContain}>
                            <Text style={styles.title}>Judul Bosq</Text>
                            <View style={styles.about}>
                                <Text>Penulis</Text>
                                <Left />
                                <Text note>20/10/2010</Text>
                            </View>
                            <Text>Jakarta, CNN Indonesia -- Ganja atau marijuana, merupakan obat depresan yang dibuat dari daun cannabis. Disebut obat depresan karena ganja dapat mempengaruhi sistem saraf dengan cara membuat lambat sistem saraf.

                            Dirangkum dari sejumlah sumber, kandungan zat Tetrahidrokanibinol (THC) di dalamnya diklaim sebagai salah satu dari 400 zat kimia yang dapat menyebabkan efek perubahan suasana hati.

                            Namun, ganja termasuk dalam daftar obat terlarang yang penggunaan serta peredarannya diatur undang-undang. Meskipun termasuk sejenis obat, ganja tak dikenal sebagai obat. Ia lebih masuk dalam jajaran sejenis narkotika.

                    Ganja biasanya dikonsumsi dalam bentuk rokok atau dimakan. Ada juga yang mencampurnya dengan minuman keras dan atau jenis narkotika lainnya. Sejauh mana manfaat dan bahayanya? </Text>

                        </View>
                    </ScrollView>
                </View>
            </>
        )
    }
}

const mapStateToProps = state => ({
    news: state.news
})
const mapDispatchToProps = {
    getDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
    },
    text: {
        color: '#000000',
    },
    parent: {
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    image: {
        backgroundColor: '#F0F0F0',
        width: 360,
        height: 250
    },
    titleContain: {
        padding: 15
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    about: {
        marginTop: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        paddingBottom: 10,
        marginBottom: 10
    }
})

