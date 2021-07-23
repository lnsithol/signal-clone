import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import { useEffect } from "react";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = () =>{
        auth.signInWithEmailAndPassword(email, password).
        catch(e => alert(e.message))
    }

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser){
                navigation.replace('Home');
            }
        })

        return unsubscribe;
    }, [])
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://logowik.com/content/uploads/images/signal-messenger-icon9117.jpg",
        }}
        style={{ width: 200, height: 200, }} />

        <View style={styles.inputContainer}>
            <Input value={email} onChangeText={text => setEmail(text)} placeholder='Email' autoFocus type='email'/>
            <Input value={password}
            onChangeText={text => setPassword(text)} 
            placeholder='Password' secureTextEntry type='password' />
        </View>
        <Button containerStyle={styles.button} onPress={signIn} title='Login' />
        <Button onPress={() => navigation.navigate('Register')} containerStyle={styles.button} type='outline' title='Register' />
        <View style={{height: 100}} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300,    
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});
