import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Dimensions } from 'react-native'
import ScreenTitle from '../components/screen-title'
import base64 from 'base-64'
import CheckBox from '@react-native-community/checkbox'
import Button from '../components/button'

const CreateGame = ({ navigation, ...props }) => {
    const [maxRounds, setMaxRounds] = useState('1')
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [allCategories, setAllCategories] = useState(false)
    const [processing, setProcessing] = useState(false)
    

    useEffect(() => {
        fetch('http://192.168.0.12:3000/v1/categories', {
            headers: {
                'Authorization': 'Basic ' + base64.encode('admin:password')
            }
        })
        .then(response => response.json())
        .then(categories => setCategories(categories))
        .catch(e => console.error(e))
    }, [])

    useEffect(() => {
        if(allCategories) {
            setSelectedCategories([...categories])
        }
    }, [allCategories])


    return (
        <View style={{ 
            flex: 1, 
            justifyContent: 'flex-start', 
            alignItems: 'center', 
            backgroundColor: '#f57242',
        }}>
            <ScreenTitle text='CREATE GAME' />
            <Text style={{
                color: 'white',
                fontSize: 24,
                margin: 30
            }}>Max rounds</Text>
            <TextInput
            value={maxRounds}
            onChangeText={text => setMaxRounds(text)}
            placeholder="Max rounds"
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
            <Text style={{
                color: 'white',
                fontSize: 24,
                margin: 30
            }}>Categories</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: Dimensions.get('screen').width / 3
            }}>
                <CheckBox value={allCategories} onValueChange={v => setAllCategories(v)} />
                <Text style={{ color: 'white', fontSize: 16 }}>Select all</Text>
            </View>
            {categories.map((c, index) => (
                <View key={index} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: Dimensions.get('screen').width / 3
                }}>
                    <CheckBox value={selectedCategories.includes(c)} onValueChange={v => {
                        const current = [ ...selectedCategories ]
                        if(v) {
                            current.push(c)
                        } else {
                            current.splice(current.indexOf(c), 1)
                            setAllCategories(false)
                        }
                        setSelectedCategories(current)
                    }} />
                    <Text style={{ color: 'white', fontSize: 16 }}>{c.name}</Text>
                </View>
            ))}
            <View style={{ padding: 30 }}>
                <Button title='CREATE' processing={processing} onClick={() => {
                    if(!processing) {
                        let accessKey = null
                        setProcessing(true)
                        fetch('http://192.168.0.12:3000/v1/rooms', {
                            method: 'POST',
                            headers: {
                                'Authorization': 'Basic ' + base64.encode('admin:password'),
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                max_rounds: parseInt(maxRounds),
                                categories: selectedCategories.map(c => c.id)
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            accessKey = data.key
                            return fetch('http://192.168.0.12:3000/v1/rooms/join', {
                                method: 'POST',
                                headers: {
                                    'Authorization': 'Basic ' + base64.encode('admin:password'),
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    access_key: data.key
                                })
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            navigation.navigate('play', {
                                accessKey: accessKey,
                                roomKey: data.key
                            })
                        })
                        .catch(e => console.error(e))
                        .finally(() => setProcessing(false))
                    }
                }}/>
            </View>
        </View>
    )
}

export default CreateGame