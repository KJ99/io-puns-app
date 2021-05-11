import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

const ScreenTitle = ({ text }) => (
    <Text style={{ 
        fontSize: 60,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'wheat'
     }}>
        {text}
    </Text>
)

export default ScreenTitle