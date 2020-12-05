import React, {Component} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {
  Button,
  Header,
  Left,
  Right,
  Label,
  Form,
  Item,
  Input,
} from 'native-base';
import LogoMaos from '../../assets/images/maos.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {loginAction} from '../../redux/actions/auth';

const loginValidationSchema = yup.object().shape({
  name: yup.string().required('Fullname is required'),
  email: yup
    .string()
    .email('Must have @ and .com')
    .required('Email address is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password min ${min} character`)
    .required('Password required'),
});

class Login extends Component {
  dologin = (data) => {
    this.props.loginAction(data);
  };

  render() {
    return (
      <View style={styles.parent}>
        <StatusBar color="#A00000" />
        <View>
          <Header transparent>
            <Left>
              <Button transparent>
                <Icon name="angle-left" size={30} />
              </Button>
            </Left>
            <Right />
          </Header>
        </View>
        <View style={styles.header}>
          <LogoMaos />
          <Text style={styles.text}>LOGIN</Text>
          <Text>Have an maos account</Text>
        </View>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => this.dologin(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
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
                <Item floatingLabel last>
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
              <Button
                block
                transparent
                onPress={() =>
                  this.props.navigation.navigate('ForgotPassword')
                }>
                <Right />
                <Text style={styles.forgot}>Forgot My Password</Text>
              </Button>
              <Button style={styles.btnLogin} block onPress={handleSubmit}>
                <Text style={styles.btntext}>LOGIN</Text>
              </Button>
            </View>
          )}
        </Formik>
      </View>
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
  },
  textError: {
    fontSize: 10,
    color: '#FF0D10',
    marginLeft: 15,
    fontStyle: 'italic',
  },
});
