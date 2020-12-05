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

class Login extends Component {
  state = {
    email: '',
    password: '',
    message: '',
  };

  login = () => {
    const {email, password} = this.state;
    this.props.loginAction(email, password);
  };

  showAlert = () => {
    const {message} = this.props.auth;
    if (message !== this.state.message) {
      this.setState({message});
      Alert.alert(message);
    }
  };

  componentDidUpdate() {
    this.showAlert();
  }

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
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => Alert.alert(JSON.stringify(values))}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            password: yup
              .string()
              .min(8)
              .max(16, 'Password should not excced 16 chars.')
              .required(),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <View style={styles.register}>
              <Form>
                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input
                    onChangeText={(email) => this.setState({email})}
                    onBlur={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.textError}>{errors.email}</Text>
                  )}
                </Item>
                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input
                    onChangeText={(password) => this.setState({password})}
                  />
                </Item>
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
              <Button style={styles.btnLogin} block onPress={this.login}>
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
    fontSize: 12,
    color: '#FF0D10',
  },
});
