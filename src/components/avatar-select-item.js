import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'

import Avatar1 from '../../assets/user-avatars/1.png'
import Avatar2 from '../../assets/user-avatars/2.png'
import Avatar3 from '../../assets/user-avatars/3.png'
import Avatar4 from '../../assets/user-avatars/4.png'
import Avatar5 from '../../assets/user-avatars/5.png'
import Avatar6 from '../../assets/user-avatars/6.png'

const avatars = [
    {
        id: 1,
        src: Image.resolveAssetSource(Avatar1).uri
    },
    {
        id: 2,
        src: Image.resolveAssetSource(Avatar2).uri
    },
    {
        id: 3,
        src: Image.resolveAssetSource(Avatar3).uri
    },
    {
        id: 4,
        src: Image.resolveAssetSource(Avatar4).uri
    },
    {
        id: 5,
        src: Image.resolveAssetSource(Avatar5).uri
    },
    {
        id: 6,
        src: Image.resolveAssetSource(Avatar6).uri
    },
]

const AvatarSelectItem = ({ id, selected, onClick }) => {
    const imageSrc = avatars.find(item => item.id == id)
    console.log(imageSrc)
    return (
        <TouchableOpacity onPress={onClick}>
            <Image source={{ uri: imageSrc.src }} style={{ 
            width: 85, 
            height: 85,
            borderWidth: 5,
            borderColor: selected ? '#34ba42' : 'transparent',
            borderRadius: 50,
            margin: 10
        }}/>
        </TouchableOpacity>
    )
}

export default AvatarSelectItem