import React from 'react'
import { View, Text, ScrollView, Dimensions, TextInput, KeyboardAvoidingView, ToastAndroid, ActivityIndicator } from 'react-native'
import ScreenTitle from '../components/screen-title'
import AvatarSelect from '../components/avatar-select'
import Button from '../components/button'
import AppStorage from '../utilities/app-storage'


export default class Settings extends React.Component
{
    state = {
        selectedAvatar: 1,
        nickname: '',
        loaded: false,
    }

    componentDidMount()
    {
        if(!this.state.loaded)
        {
            AppStorage.load({ key: 'user.profile' })
            .then(data => {
                this.setState({
                    nickname: data.nickname,
                    selectedAvatar: data.avatar,
                    loaded: true
                })
            })
            .catch(e => this.setState({ ...this.state, loaded: true }))
        }
    }

    render()
    {
        return this.state.loaded ? (
            <ScrollView style={{ 
                minHeight: Dimensions.get('window').height, 
                backgroundColor: '#f57242',
                paddingBottom: 50  
            }}>
                <View style={{ 
                    flex: 1, 
                    justifyContent: 'flex-start', 
                    alignItems: 'center', 
                }}>
                    <ScreenTitle text='SETTINGS' />
                    <KeyboardAvoidingView behavior='position'>
                        <Text style={{
                            color: 'white',
                            fontSize: 24,
                            margin: 30
                        }}>Choose your nickname</Text>
                        <TextInput
                        value={this.state.nickname}
                        onChangeText={text => this.setState({ ...this.state, nickname: text })}
                        placeholder="Nickname"
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
                    <Text style={{
                        color: 'white',
                        fontSize: 24,
                        margin: 30
                    }}>Choose your avatar</Text>
                    <AvatarSelect selectedItem={this.state.selectedAvatar} onChange={id => this.setState({ ...this.state, selectedAvatar: id })} />
                    <View style={{
                        padding: 40
                    }}>
                        <Button title='SAVE' width={200} onClick={() => {
                            AppStorage.save({
                                key: 'user.profile',
                                data: {
                                    nickname: this.state.nickname,
                                    avatar: this.state.selectedAvatar
                                },
                                expires: null
                            })
                            .then(() => ToastAndroid.show('Settings saved', ToastAndroid.LONG))
                            .catch(() => ToastAndroid.show('Could not save settings', ToastAndroid.LONG))
                        }}/>
                    </View>
                </View>
            </ScrollView>
        ) : (
            <View style={{ 
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: '#f57242',
            }}>
                <ActivityIndicator animating={true} color='#34ba42' size={100} />
            </View>
        )
    }
}