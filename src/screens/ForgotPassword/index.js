import React, {Component} from 'react';
import {
  TextInput,
  Item,
  Label,
  Input,
  Text,
  Button,
  Alert,
  View,
  StyleSheet,
} from 'react-native';
import * as yup from 'yup';
import {Formik, Form} from 'formik';

export default class App extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };
  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => Alert.alert(JSON.stringify(values))}
        validationSchema={yup.object().shape({
          name: yup.string().required('Please, provide your name!'),
          email: yup.string().email().required(),
          password: yup
            .string()
            .min(4)
            .max(10, 'Password should not excced 10 chars.')
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
          <View style={styles.formContainer}>
            <Form>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input onBlur={() => setFieldTouched('email')} />
                {touched.email && errors.email && (
                  <Text style={styles.textError}>{errors.email}</Text>
                )}
              </Item>
            </Form>
            <TextInput
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              placeholder="E-mail"
            />
            {touched.email && errors.email && (
              <Text style={styles.textError}>{errors.email}</Text>
            )}
            <TextInput
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder="Password"
              onBlur={() => setFieldTouched('password')}
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <Text style={styles.textError}>{errors.password}</Text>
            )}
            <Button
              color="#3740FE"
              title="Submit"
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
  },
  textError: {
    fontSize: 12,
    color: '#FF0D10',
  },
});
