import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {
  Button,
  Header,
  Left,
  Text,
  Right,
  Label,
  Form,
  Item,
  Input,
} from 'native-base';
import LogoMaos from '../../assets/images/maos.svg';
import Icon from 'react-native-vector-icons/FontAwesome';

import {registerAction} from '../../redux/actions/register';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    message: '',
  };

  signUp = () => {
    const {name, email, password} = this.state;
    const data = {
      name: name,
      email: email,
      password: password,
    };
    this.props.registerAction(data);
  };

  showAlert = () => {
    const {message} = this.props.register;
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
        <ScrollView>
          <View style={styles.header}>
            <LogoMaos />
            <Text style={styles.text}>Sign Up</Text>
          </View>
          <View style={styles.register}>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={(name) => this.setState({name})} />
              </Item>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input onChangeText={(email) => this.setState({email})} />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input
                  type="password"
                  onChangeText={(password) => this.setState({password})}
                />
              </Item>
            </Form>
            <Button style={styles.btnLogin} onPress={this.signUp} block>
              <Text style={styles.btntext}>Sign Up</Text>
            </Button>
            <View style={styles.footer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.loginTxt}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  register: state.register,
});
const mapDispatchToProps = {
  registerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

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
    marginLeft: 10,
    marginRight: 10,
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
