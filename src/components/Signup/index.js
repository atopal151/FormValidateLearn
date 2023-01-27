import React, { Component } from 'react'
import { NativeBaseProvider, Heading } from "native-base";
import SignupForm from './SignupForm';

export default class Signup extends Component {
    render() {
        return (
            <NativeBaseProvider>
                <Heading size="lg" style={{ margin: 10 }}>SignUp</Heading>
                <SignupForm />
            </NativeBaseProvider>
        )
    }
}
