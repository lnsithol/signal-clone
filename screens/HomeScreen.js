import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([])
    const singOutUser = () => {
        auth.signOut().then(() =>{
            navigation.replace('Login')
        });
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: { backgroundColor: 
            'white'},
            headerTitleStyle: {color: 'black'},
            headerTintColor: 'blue',
            headerLeft: () => 
            <View style={{marginLeft: 20}}>
                <TouchableOpacity onPress={singOutUser} activeOpacity={0.5}>
                <Avatar rounded source={{
                    uri: auth?.currentUser?.photoURL
                }} />
                </TouchableOpacity>
            </View>,
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' color='black' size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons
                        onPress={() => navigation.navigate('AddChat')}
                        name='pencil' color='black' size={24} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])
 
    useEffect(() => {
       const unsubscribe = db.collection('chats').onSnapshot(snapshot =>(
           setChats(snapshot.docs.map(doc =>({
               id: doc.id,
               data: doc.data()
           })))
       ))
       return unsubscribe;
    }, [])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id,
            chatName
        })
    }
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({
                    id, data:{chatName}
                }) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}
                
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
})
