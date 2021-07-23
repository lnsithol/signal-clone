import React, { useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text } from "react-native-elements";
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native'
import { useState } from 'react';
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login',
        })
    }, [navigation])

    const register = () =>{
        auth.createUserWithEmailAndPassword(email, password).
        then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
            })
        }).catch(e => alert(e.message))
    }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal Account
            </Text>
            <View style={styles.inputContainer}>
                <Input placeholder='Full Name' autoFocus type='text' value={name} onChangeText={text => setName(text)}/>
                <Input placeholder='Email' type='email' value={email} onChangeText={text => setEmail(text)}/>
                <Input placeholder='Password' type='password' secureTextEntry value={password} onChangeText={text => setPassword(text)}/>
                <Input placeholder='Profile Picture URL (Optional)' 
                type='text' value={imageUrl}
                onSubmitEditing={register} 
                onChangeText={text => setImageUrl(text)}/>
            </View>
            <Button
            containerStyle={styles.button}
            title='Register'
            onPress={register}
            raised />
            <View style={{height: 100}}/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 400,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})