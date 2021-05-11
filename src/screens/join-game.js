import React from 'react'
import { View, Text, ScrollView, Dimensions, KeyboardAvoidingView, TextInput } from 'react-native'
import ScreenTitle from '../components/screen-title'
import AvatarSelect from '../components/avatar-select'
import Button from '../components/button'


export default class JoinGame extends React.Component
{
    state = {
        selectedAvatar: 1,
    }

    render()
    {
        return (
            <View style={{ 
                flex: 1, 
                justifyContent: 'flex-start', 
                alignItems: 'center', 
                backgroundColor: '#f57242',
            }}>
                <ScreenTitle text='JOIN GAME' />
                <View style={{ padding: 100 }}>
                    <KeyboardAvoidingView behavior='position'>
                        <Text style={{
                            color: 'white',
                            fontSize: 24,
                            margin: 30
                        }}>Enter the game key</Text>
                        <TextInput
                        value={this.state.nickname}
                        onChangeText={text => this.setState({ ...this.state, nickname: text })}
                        placeholder="Game key"
                        placeholderTextColor='wheat'
                        style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 10,
                            paddingTop: 10,
                            borderWidth: 2,
                            borderColor: '#ddd',
                            color: '#efefef',
                            borderRadius: 15,
                            width: 300,
                            fontSize: 20,
                            
                        }}
                        />
                    </KeyboardAvoidingView>
                </View>
                <Button title='JOIN' width={200} />
            </View>
        )
    }
}