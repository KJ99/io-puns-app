import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import AvatarSelectItem from './avatar-select-item'

const AvatarSelect = ({ selectedItem, onChange }) => {

    const ids = [1, 2, 3, 4, 5, 6]
    return (
        <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {ids.map((item, index) => (
                <AvatarSelectItem 
                key={index} id={item} 
                selected={selectedItem == item}
                onClick={() => onChange(item)}/>
            ))}
        </View>
    )
}

export default AvatarSelect