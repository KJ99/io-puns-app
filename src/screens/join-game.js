import React from 'react'
import { View, Text, ScrollView, Dimensions, KeyboardAvoidingView, TextInput } from 'react-native'
import ScreenTitle from '../components/screen-title'
import AvatarSelect from '../components/avatar-select'
import Button from '../components/button'
import base64 from 'base-64'


export default class JoinGame extends React.Component
{
    state = {
        processing: false,
        gameKey: ''

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
                        value={this.state.gameKey}
                        onChangeText={text => this.setState({ ...this.state, gameKey: text })}
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
                <Button title='JOIN' width={200} processing={this.state.processing} onClick={() => {
                    if(!this.state.processing) {
                        this.setState({ ...this.state, processing: true })
                        fetch('http://192.168.0.12:3000/v1/rooms/join', {
                            method: 'POST',
                            headers: {
                                'Authorization': 'Basic ' + base64.encode('admin:password'),
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                access_key: this.state.gameKey
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            this.props.navigation.navigate('play', {
                                accessKey: this.state.gameKey,
                                roomKey: data.key
                            })
                        })
                        .catch(e => console.error(e))
                        .finally(() => setProcessing(false))
                    }
                }} />
            </View>
        )
    }
}