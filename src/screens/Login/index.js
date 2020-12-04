import React, {Component} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
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
        <View style={styles.register}>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(email) => this.setState({email})} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={(password) => this.setState({password})} />
            </Item>
          </Form>
          <Button block transparent>
            <Right />
            <Text style={styles.forgot}>Forgot My Password</Text>
          </Button>
          <Button style={styles.btnLogin} block onPress={this.login}>
            <Text style={styles.btntext}>LOGIN</Text>
          </Button>
        </View>
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
});
