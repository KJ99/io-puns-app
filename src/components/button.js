import React from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'

const Button = ({ title, width, processing, onClick }) => {
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
           <Content processing={processing} title={title} />
        </TouchableOpacity>
    )
}

const Content = ({ processing, title }) => {
    return processing 
        ? <ActivityIndicator size='small' color='white' />
        :  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{title}</Text>
}

export default Button