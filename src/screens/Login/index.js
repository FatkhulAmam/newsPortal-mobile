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
import {loginAction} from '../../redux/actions/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
  dologin = (data) => {
    this.props.loginAction(data);
    const {message, isError} = this.props.auth;
    if (isError) {
      Alert.alert(message);
    } else {
      Alert.alert(message);
    }
  };

  render() {
    return (
      <>
        <View style={styles.parent}>
          <StatusBar backgroundColor={'#A00000'} />
          <View>
            <Header transparent>
              <Button transparent>
                <Icon name="angle-left" size={30} />
              </Button>
              <Right />
            </Header>
          </View>
          <View style={styles.header}>
            <LogoMaos />
            <Text style={styles.text}>LOGIN</Text>
            <Text>Have an maos account</Text>
          </View>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={schemaValidation}
            onSubmit={(values) => this.dologin(values)}>
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
                <TouchableOpacity
                  style={styles.touchForgot}
                  onPress={() =>
                    this.props.navigation.navigate('ForgotPassword')
                  }>
                  <Text style={styles.forgot}>Forgot My Password</Text>
                </TouchableOpacity>
                <Button style={styles.btnLogin} onPress={handleSubmit} block>
                  {this.props.auth.isLoadingLogin === false ? (
                    <Text style={styles.btntext}>LOGIN</Text>
                  ) : (
                    <ActivityIndicator
                      color="#ffffff"
                      animating={this.props.auth.isLoadingLogin}
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
  loginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  text: {
    marginTop: 25,
    fontSize: 40,
    fontWeight: 'bold',
  },
  register: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
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
    borderRadius: 25,
    marginTop: 20,
    backgroundColor: '#A00000',
  },
  btntext: {
    color: '#FFFFFF',
  },
  forgot: {
    marginTop: 15,
    color: '#A00000',
    left: 200,
  },
  textError: {
    fontSize: 10,
    color: '#FF0D10',
    marginLeft: 15,
    fontStyle: 'italic',
  },
});
