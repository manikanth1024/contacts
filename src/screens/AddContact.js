import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { contacts } from '../utils/contacts';

const AddContact = ({route, navigation}) => {

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');

    const [first_name_err, setFirstNameErr] = useState('');
    const [last_name_err, setLastNameErr] = useState('');
    const [phone_number_err, setPhoneNumberErr] = useState('');

    const onAddContact = () => {
        if(first_name == ''){
            setFirstNameErr('Please enter your first name');
        } else if(last_name == ''){
            setFirstNameErr('');
            setLastNameErr('Please enter your last name');
        } else if(phone_number.length < 10){
            setFirstNameErr('');
            setLastNameErr('');
            setPhoneNumberErr('Phone number should be 10 numbers');
        } else if (phone_number == ''){
            setFirstNameErr('');
            setLastNameErr('');
            setPhoneNumberErr('Please enter your phone number');
        } else {
            setFirstNameErr('');
            setLastNameErr('');
            setPhoneNumberErr('');
            storePhoneNumber();
        }
    }

    const storePhoneNumber = async () => {
        let contact_list = JSON.parse(await AsyncStorage.getItem('@contacts'));
        let contact = {
            "name" : (`${first_name} ${last_name}`).trim(),
            "phone": phone_number.trim()
        }
        let isExisted = contact_list.findIndex(item => item.phone === contact.phone);
        if(isExisted != -1){
            Alert.alert('Number is already exists');
            return;
        }
        contact_list.push(contact);
        AsyncStorage.setItem('@contacts', JSON.stringify(contact_list));
        navigation.navigate('home');

    }
 
    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="First Name"
                style={styles.input}
                onChangeText={text => setFirstName(text)}
            />
            <Text style={styles.errText}>{first_name_err}</Text>
            <TextInput 
                placeholder="Last Name"
                style={styles.input}
                onChangeText={text => setLastName(text)}
            />
            <Text style={styles.errText}>{last_name_err}</Text>
             <TextInput 
                placeholder="Mobile Number"
                style={styles.input}
                keyboardType="phone-pad"
                onChangeText={text => setPhoneNumber(text)}
                maxLength={10}
            />
            <Text style={styles.errText}>{phone_number_err}</Text>
            
            <TouchableOpacity style={styles.addButton} onPress={onAddContact}>
                <Text style={{color: 'white' ,fontSize: 20, fontWeight: '500'}}>Add Contact</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    addButton: {
        width: '90%',
        height: 50,
        borderRadius: 30, 
        backgroundColor: '#903554', 
        alignItems: 'center', 
        justifyContent: 'center',
        alignSelf: 'center'
    },
    input: {
        borderBottomWidth: 1, 
        borderBottomColor: '#903554', 
        width: '90%' ,
        alignSelf: 'center', 
        marginHorizontal: 20,
        marginTop: 20
    },
    errText: {
        width: '90%' ,
        alignSelf: 'center', 
        margin: 20,
        color: 'red'
    }
})

export default AddContact;