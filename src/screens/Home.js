import React, {useState, useLayoutEffect, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { contacts } from '../utils/contacts';

const {width, height} = Dimensions.get('window');

const Home = ({route, navigation}) => {

    const [contacts_list, setContactsList] = useState();

    useFocusEffect(() => {
        getContacts();
    });

    const storeContacts = async () => {
        try {
          const contact_list = await AsyncStorage.getItem('@contacts');
          if(!contact_list){
            await AsyncStorage.setItem('@contacts', JSON.stringify(contacts));
          }
        } catch (error) {
          
        }
      };

    useLayoutEffect(()=> {
        getContacts();
    },[]);

    useEffect(() => {
        storeContacts();
    },[contacts_list]);

    const getContacts = async () => {
        try {
            const contacts = await AsyncStorage.getItem('@contacts');
            setContactsList(JSON.parse(contacts));
        } catch (error) {
            
        }
    }

    const displayImage = (name) => {
       return /\s/.test(name) ? splitName(name) : name[0].toUpperCase();
    }

    const splitName = (name) => {
        return name[0].toUpperCase() + name[name.indexOf(' ') + 1].toUpperCase();
    }

    const renderContact = ({item, index}) => {

        return (
            <View style={styles.card}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff4b1f", "#1fddff"]} style={styles.gradient}>
                    <Text style={[styles.imageText,{color: 'white', fontWeight: 'bold'}]}>{displayImage(item.name)}</Text>
                </LinearGradient>
                <View style={{padding: 10}}>
                    <Text style={{fontSize: 18, paddingBottom: 5}}>{item.name}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Icon name="phone-in-talk" color="#903554" size={20} />
                        <Text>{` +91 - ${item.phone}`}</Text>
                    </View>
                </View>
                <Icon name="delete-outline" color="#903554" size={28} style={styles.rightIcon} onPress={()=> deleteContact(index)}/>
            </View>
        );
    }

    const renderHeader = () => {
        return (
            <View style={styles.content}>
                <Icon name="account-group-outline" size={28} />
                <Text style={[styles.imageText, {paddingHorizontal: 10}]}>{'Team members'}</Text>
                <Icon name="alert-circle" size={28}  color="#529a8e" style={styles.rightIcon} />
            </View>
        )
    }

    const deleteContact = async (index) => {
        contacts_list.splice(index, 1);
        setContactsList(contacts_list);
        await AsyncStorage.setItem('@contacts', JSON.stringify(contacts_list));
    };

    const addContact = () => {
        navigation.navigate("add_contact");
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts_list ? contacts_list : contacts}
                renderItem={renderContact}
                extraData={contacts_list}
                keyExtractor={(item) => item.phone}
                ListHeaderComponent={renderHeader}
                initialNumToRender={5}
            />
            <View style={{height: 40}}/>
            <View style={styles.addContact}> 
                <Icon name="plus" color="white" size={32} onPress={addContact}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageText: {
        fontSize: 26
    },
    card: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white',
        elevation: 6,
        width: width * 0.9,
        flexDirection: 'row',
        padding: 10,
        alignSelf: 'center',
        shadowColor: '#1fddff',
        shadowOffset: {width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        borderRadius: 6
    },
    rightIcon: {
        flex: 1, 
        alignSelf: 'center', 
        textAlign: 'right'
    },
    content: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
        padding: 10,
        margin: 10
    },
    gradient: {
        width: width * 0.15, 
        height: width * 0.15, 
        borderRadius: width * 0.15/2, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    addContact: {
        width: 60, 
        height: 60, 
        borderRadius: 30, 
        backgroundColor: '#903554', 
        position: 'absolute', 
        bottom: 20, 
        right: 20, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});

export default Home;