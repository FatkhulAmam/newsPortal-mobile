import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {Button, Text, Label, Form, Item, Input} from 'native-base';
import LogoMaos from '../../assets/images/maos.svg';
import {Formik} from 'formik';
import * as yup from 'yup';

import {registerAction} from '../../redux/actions/auth';

const registerValidationSchema = yup.object().shape({
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

class SignUp extends Component {
  signUp = (data) => {
    this.props.registerAction(data);
    const {message, isError} = this.props.register;
    if (isError) {
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
          <StatusBar backgroundColor={'#A00000'} />
          <ScrollView>
            <View style={styles.header}>
              <LogoMaos />
              <Text style={styles.text}>Sign Up</Text>
            </View>
            <Formik
              validationSchema={registerValidationSchema}
              initialValues={{
                name: '',
                email: '',
                password: '',
              }}
              onSubmit={(values) => this.signUp(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.register}>
                  <Form>
                    <Item floatingLabel>
                      <Label>Username</Label>
                      <Input
                        name="name"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                      />
                    </Item>
                    {touched.name && errors.name && (
                      <Text style={styles.textError}>{errors.name}</Text>
                    )}
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
                    {this.props.register.isLoadingRegister === false ? (
                      <Text style={styles.btntext}>Sign Up</Text>
                    ) : (
                      <ActivityIndicator
                        color="#ffffff"
                        animating={this.props.register.isLoadingRegister}
                        style={styles.indicator}
                      />
                    )}
                  </Button>
                  <View style={styles.footer}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Login')}>
                      <Text style={styles.loginTxt}>Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  register: state.auth,
});
const mapDispatchToProps = {
  registerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  text: {
    marginTop: 25,
    fontSize: 40,
    fontWeight: 'bold',
  },
  register: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  textError: {
    fontSize: 10,
    color: '#FF0D10',
    marginLeft: 15,
    fontStyle: 'italic',
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
    marginTop: 25,
    backgroundColor: '#A00000',
  },
  btntext: {
    color: '#FFFFFF',
  },
  loginTxt: {
    color: '#A00000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
});
