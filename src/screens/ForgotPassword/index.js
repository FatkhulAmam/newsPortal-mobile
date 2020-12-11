import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {Button, Header, Right, Label, Form, Item, Input} from 'native-base';
import LogoMaos from '../../assets/images/maos.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {changePassword} from '../../redux/actions/auth';

const schemaValidation = yup.object().shape({
  email: yup
    .string()
    .email('Masukkan alamat email dengan benar')
    .required('Email dibutuhkan'),
  password: yup
    .string()
    .min(8, 'Password setidaknya terdiri dari 8 karakter')
    .required('Password dibutuhkan'),
});

class Login extends Component {
  doChange = async (data) => {
    await this.props.changePassword(data);
    const {message, isError} = this.props.auth;
    console.log(message);
    if (isError === true) {
      Alert.alert(message);
    } else {
      Alert.alert(message);
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <>
        <View style={styles.parent}>
          <View>
            <Header transparent>
              <StatusBar backgroundColor={'#A00000'} />
              <Button transparent>
                <Icon name="angle-left" size={30} />
              </Button>
              <Right />
            </Header>
          </View>
          <View style={styles.header}>
            <LogoMaos />
            <Text style={styles.text}>FORGOT PASSWORD</Text>
            <Text>Change my password, but i am forget the password</Text>
          </View>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={schemaValidation}
            onSubmit={(values) => this.doChange(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => (
              <View style={styles.register}>
                <Form>
                  <Item floatingLabel>
                    <Label>Email</Label>
                    <Input
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      keyboardType="email-address"
                    />
                  </Item>
                  {touched.email && errors.email && (
                    <Text style={styles.textError}>{errors.email}</Text>
                  )}
                  <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                      secureTextEntry
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                  </Item>
                  {touched.password && errors.password && (
                    <Text style={styles.textError}>{errors.password}</Text>
                  )}
                </Form>
                <Button style={styles.btnLogin} onPress={handleSubmit} block>
                  {this.props.auth.isLoadingRegister === false ? (
                    <Text style={styles.btntext}>CHANGE</Text>
                  ) : (
                    <ActivityIndicator
                      color="#ffffff"
                      animating={this.props.auth.isLoadingRegister}
                      style={styles.indicator}
                    />
                  )}
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = {
  changePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  text: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
  },
  register: {
    marginRight: 15,
    marginTop: 50,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    color: '#A00000',
  },
  textLogin: {
    fontSize: 17,
    textAlign: 'right',
    marginRight: 15,
    marginTop: 10,
  },
  touchForgot: {
    width: '100%',
    right: 0,
  },
  btnLogin: {
    marginLeft: 15,
    borderRadius: 25,
    marginTop: 30,
    backgroundColor: '#A00000',
  },
  btntext: {
    color: '#FFFFFF',
  },
  textError: {
    fontSize: 10,
    color: '#FF0D10',
    marginLeft: 15,
    fontStyle: 'italic',
  },
});
