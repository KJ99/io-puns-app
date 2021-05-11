import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

const Button = ({ title, width, onClick }) => {
    return (
        <TouchableOpacity style={{
            width: width,
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
            borderRadius: 20,
            backgroundColor: '#34ba42',
            alignItems: 'center',
            justifyContent: 'center',
            
        }}
        onPress={onClick}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button