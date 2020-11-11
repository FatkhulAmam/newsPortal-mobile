import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'

//import logo
import logo from '../../assets/images/logoSplash.png'

const Splash = ({ navigation }) => {
    useEffect(()=>{
        setTimeout(() => {
            navigation.replace("SignUp")
        }, 1000);
    }, [navigation]);

    return (
        <View style={styles.parent}>
            <Image source={logo} />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A00000'
    }
})
