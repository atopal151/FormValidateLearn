import React, { Component } from 'react'
import {  StyleSheet,Alert } from 'react-native'
import { Formik } from 'formik'
import {  Box, Input, View, Button, Spinner, FormControl, WarningOutlineIcon } from "native-base";
import * as Yup from 'yup'

export default class SignupForm extends Component {

    _handleSubmit = async (values, bag) => {
        try {
          await api(values);
          bag.setSubmitting(false)
          Alert.alert("Welcome")
        } catch (error) {
          bag.setErrors(error)
        }
      };

      
    render() {
        const validations = Yup.object().shape({
            email: Yup.
                string().
                email().
                required(),
            password: Yup
                .string()
                .min(6)
                .required(),
            passwordConfirm: Yup
                .string()
                .oneOf([Yup.ref('password')], 'Confirm password must matched password.')
                .required()
        });
        return (
            <View style={styles.container}>
                
                <Formik
                    initialValues={{ email: '', password: '', passwordConfirm: '' }}
                    onSubmit={this._handleSubmit}
                    validationSchema={validations}>
                    {({ values,
                        handleChange,
                        handleSubmit,
                        errors,
                        setFieldTouched,
                        isValid,
                        isSubmitting
                    }) => (
                        <Box alignItems="center">
                            <FormControl isInvalid w="100%" maxW="340px">
                                <View style={{ margin: 10 }}>
                                    <Input
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                        mx="3"
                                        autoCapitalize={'none'}
                                        placeholder="Write"
                                        onBlur={() => setFieldTouched('email')}
                                        w="100%" />
                                    <FormControl.ErrorMessage leftIcon={
                                        <WarningOutlineIcon size="xs" />}>
                                        {errors.email}
                                    </FormControl.ErrorMessage>
                                </View>

                                <View style={{ margin: 10 }}>
                                    <Input
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        mx="3"
                                        autoCapitalize={'none'}
                                        placeholder="Password"
                                        onBlur={() => setFieldTouched('password')}
                                        w="100%"
                                        secureTextEntry={true} />
                                    <FormControl.ErrorMessage leftIcon={
                                        <WarningOutlineIcon size="xs" />}>
                                        {errors.password}
                                    </FormControl.ErrorMessage>
                                </View>

                                <View style={{ margin: 10 }}>
                                    <Input
                                        onChangeText={handleChange('passwordConfirm')}
                                        value={values.passwordConfirm}
                                        mx="3"
                                        autoCapitalize={'none'}
                                        placeholder="Password Confirm"
                                        onBlur={() => setFieldTouched('passwordConfirm')}
                                        w="100%"
                                        secureTextEntry={true} />
                                    <FormControl.ErrorMessage leftIcon={
                                        <WarningOutlineIcon size="xs" />}>
                                        {errors.passwordConfirm}
                                    </FormControl.ErrorMessage>
                                </View>
                            </FormControl>
                            <Button
                                onPress={handleSubmit}
                                disabled={!isValid || isSubmitting}
                                style={{ margin: 10, width: '50%' }}
                            >
                                {isSubmitting && <Spinner size={'small'} color={'white'} />}

                                Join
                            </Button>
                        </Box>
                    )}
                </Formik>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
})
