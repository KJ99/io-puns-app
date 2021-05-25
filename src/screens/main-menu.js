import React from 'react'
import { Text, View } from 'react-native'
import Button from '../components/button'
import ScreenTitle from '../components/screen-title'

const MainMenu = ({ navigation }) => {
    return (
        <View style={{ 
            flex: 1, 
            justifyContent: 'space-around', 
            alignItems: 'center', 
            backgroundColor: '#f57242' 
        }}>
            <ScreenTitle text='Puns' />
            <Button title='CREATE ROOM' width={200} onClick={() => navigation.push('create')}/>
            <Button title='JOIN GAME'  width={200} onClick={() => {
                navigation.push('join')
            }} />
            <Button title='SETTINGS'  width={200} onClick={() => {
                navigation.push('settings')
            }} />
        </View>
    )
}


export default MainMenu