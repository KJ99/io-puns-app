import React from 'react'
import { Image } from 'react-native'

import Avatar1 from '../../assets/user-avatars/1.png'
import Avatar2 from '../../assets/user-avatars/2.png'
import Avatar3 from '../../assets/user-avatars/3.png'
import Avatar4 from '../../assets/user-avatars/4.png'
import Avatar5 from '../../assets/user-avatars/5.png'
import Avatar6 from '../../assets/user-avatars/6.png'

const avatars = [
    {
        id: '1.png',
        src: Image.resolveAssetSource(Avatar1).uri
    },
    {
        id: '2.png',
        src: Image.resolveAssetSource(Avatar2).uri
    },
    {
        id: '3.png',
        src: Image.resolveAssetSource(Avatar3).uri
    },
    {
        id: '4.png',
        src: Image.resolveAssetSource(Avatar4).uri
    },
    {
        id: '5.png',
        src: Image.resolveAssetSource(Avatar5).uri
    },
    {
        id: '6.png',
        src: Image.resolveAssetSource(Avatar6).uri
    },
]

const PlayerAvatar = ({ id }) => {
    console.log(`avatar id ${id}`)
    const imageSrc = avatars.find(item => item.id == id)
    return (
        <Image source={{ uri: imageSrc?.src }} style={{ 
            width: 50, 
            height: 50,
            borderRadius: 50
        }}/>
    )
}


export default PlayerAvatar