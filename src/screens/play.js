import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Dimensions, ActivityIndicator, ScrollView, FlatList } from 'react-native'
import useWebSocket from 'react-use-websocket'
import Button from '../components/button'
import PlayerAvatar from '../components/player-avatar'
import AppStorage from '../utilities/app-storage'

const Play = ({ route: { params }, navigation, ...props }) => {
    const [connected, setConnected] = useState(false)
    const [roomKey, setRoomKey] = useState(null)
    const [players, setPlayers] = useState([])
    const [playerId, setPlayerId] = useState(null)
    const {
        sendJsonMessage,
        lastJsonMessage,
      } = useWebSocket('http://192.168.0.12:3999', {
          onOpen: () => setConnected(true),
          onError: e => console.warn(e)
      });
    useEffect(() => {
        setRoomKey(params.roomKey)
    }, [])

    useEffect(() => {
        if(lastJsonMessage?.topic === 'welcome') {
            setPlayerId(lastJsonMessage.body.you)
            setPlayers(lastJsonMessage.body.players.filter(p => p.id != lastJsonMessage.body.you))
        } else if(lastJsonMessage?.topic === 'player.joined') {
            setPlayers([ lastJsonMessage.body, ...players ])
        }
    }, [lastJsonMessage])

    useEffect(() => {
        if(connected && roomKey) {
            let userProfile = {}
            AppStorage.load({ key: 'user.profile' })
            .then(data => userProfile = data)
            .catch(e => userProfile = { nickname: `user${Date.now()}`, avatar: '1.png' })
            .finally(() => sendJsonMessage({topic: 'join.game', body: {key: roomKey, ...userProfile}}))
        }
    }, [connected, roomKey])

    return (
        <View style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: '#f57242',
        }}>
            <CurrentScreen 
            accessKey={params?.accessKey} 
            playerId={playerId} 
            players={players} 
            lastJsonMessage={lastJsonMessage}
            sendJsonMessage={sendJsonMessage}
            navigation={navigation} />
        </View>
    )
}

const CurrentScreen = ({ 
    lastJsonMessage, 
    players, 
    playerId, 
    accessKey,
    sendJsonMessage,
    navigation,
    ...props }) => {
    let view = null 
    switch(lastJsonMessage?.topic) {
        case 'welcome':
        case 'player.joined':
            view = <GetReadyScreen sendJsonMessage={sendJsonMessage} accessKey={accessKey} playerId={playerId} players={players} />
            break
        case 'next.round':
            view = lastJsonMessage.body.presenter.id == playerId
                ? (
                    <PresenterScreen 
                    playerId={playerId}
                    players={players}
                    word={lastJsonMessage.body.word}
                    sendJsonMessage={sendJsonMessage}/>
                )
                : (
                    <RoundScreen 
                    presenter={lastJsonMessage.body.presenter}
                    word={lastJsonMessage.body.word}/>
                )
            break
        case 'round.finished':
            view = <RoundFinishedScreen winner={lastJsonMessage.body.winner} points={lastJsonMessage.body.points} />
            break
        case 'ranking':
            view = <RankingScreen 
                players={lastJsonMessage.body}
            />
            break
        case 'game.finished':
            view = <GameFinishedScreen navigation={navigation} playerId={playerId} winner={lastJsonMessage.body.winner} />
            break
        default:
            view = <WaitingScreen />
    }
    return view
}

const WaitingScreen = ({ ...props }) => {
    return (
        <View>
            <ActivityIndicator size='large' color='#34ba42' />
            <Text style={{
                color: 'white',
                fontSize: 24,
                margin: 30
            }}>Joining to the room</Text>
        </View>
    )
}

const GetReadyScreen = ({ accessKey, playerId, players, sendJsonMessage, ...props }) => {
    const [readySent, setReadySent] = useState(false)
    return (
        <View style={{
        }}>
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 18,
                }}>Waiting for other players</Text>
                <Text style={{
                    color: 'white',
                    fontSize: 18,
                }}>Access key: {accessKey}</Text>
            </View>
            <View style={{
                flex: 2,
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <FlatList
                renderItem={row => (
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: Dimensions.get('screen').width
                    }}>
                        <PlayerAvatar id={row.item.avatar} />
                        <Text style={{ fontSize: 24, color: 'white', marginLeft: 20 }}>{row.item.nickname}</Text>
                    </View>
                )}
                data={players} />
            </View>
           <View style={{
               flex: 1,
               justifyContent: 'flex-end',
               alignItems: 'center'
           }}>
               <Button title='READY' onClick={() => {
                   if(!readySent) {
                       setReadySent(true)
                       sendJsonMessage({ topic: 'ready', body: { player: playerId } })
                   }
               }} />
           </View>
        </View>
    )
}

const PresenterScreen = ({ playerId, players, word, sendJsonMessage }) => {
    const [winnerSent, setWinnerSent] = useState(false)
    return (
        <View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                        color: 'wheat',
                        fontSize: 18,
                        marginBottom: 10
                }}>You are the Presenter</Text>
                <Text style={{
                        color: 'white',
                        fontSize: 24,
                }}>{word.name}</Text>
                <Text style={{
                        color: 'wheat',
                        fontSize: 18,
                }}>{word.category}</Text>
            </View>
            <View style={{
                flex: 1
            }}>
                <FlatList
                    renderItem={row => (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: Dimensions.get('screen').width,
                            padding: 5
                        }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <PlayerAvatar id={row.item.avatar} />
                            </View>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Text style={{ fontSize: 24, color: 'white' }}>{row.item.nickname}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems:'center'
                            }}>
                                <Button title='WINNER' onClick={() => {
                                    if(!winnerSent) {
                                        setWinnerSent(true)
                                        sendJsonMessage({ topic: 'set.winner', body: { player: playerId, winner: row.item.id } })
                                    }
                                }} />
                            </View>
                        </View>
                    )}
                    data={players} />
            </View>
        </View>
    )
}

const RoundScreen = ({ presenter, word }) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                color: 'white',
                fontSize: 24,
                margin: 10
            }}>{presenter.nickname} is presenting now</Text>
            <Text style={{
                color: 'white',
                fontSize: 16,
            }}>Category: {word.category}</Text>
        </View>
    )
}

const RoundFinishedScreen = ({ winner, points }) => {
    let view = null
    if(winner == null) {
        view = (
            <View style={{ 
                flex: 1, 
                backgroundColor: 'red', 
                justifyContent: 'center', 
                alignItems: 'center',
                width: Dimensions.get('window').width 
            }}>
                <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 24
                }}>
                    No one wins this round :(
                </Text>
            </View>
        )
    } else {
        view = (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 24
                }}>
                    {winner} is the winner
                </Text>
                <Text style={{
                    color: 'wheat',
                    fontSize: 18,
                    fontStyle: 'italic'
                }}>
                    +{points} points
                </Text>
            </View>
        ) 
    }
    return view
}

const RankingScreen = ({ players }) => {
    return (
        <View>
            <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 24,
                textAlign: 'center',
                width: Dimensions.get('screen').width,
                margin: 15
            }}>
                Current Rank
            </Text>
            <FlatList
            data={players}
            keyExtractor={(item, index) => index.toString()}
            renderItem={row => (
                <View key={row.index} style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: Dimensions.get('screen').width
                }}>
                    
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems:'center'
                    }}>
                        <Text style={{ color: 'white', fontSize: 16 }}>{row.index + 1}.</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems:'center'
                    }}>
                        <PlayerAvatar id={row.item.avatar} />
                    </View>
                    <View style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems:'center'
                    }}>
                        <Text style={{ color: 'white', fontSize: 16 }}>{row.item.nickname}</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems:'center'
                    }}>
                        <Text style={{ color: 'white', fontSize: 16 }}>{row.item.points} points</Text>
                    </View>
                </View>
            )}
            />
        </View>
    )
}

const GameFinishedScreen = ({ navigation, playerId, winner }) => {
    
    return (
        <View style={{
            flex: 1,
            width: Dimensions.get('screen').width,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: playerId == winner.id ? 'green' : 'transparent'
        }}>
            <View style={{ margin: 10 }}>
                <PlayerAvatar id={winner.avatar} />
            </View>
            <View style={{ margin: 10 }}>
                <Text 
                style={{ 
                    color: 'white', 
                    fontSize: 28,
                    width: Dimensions.get('screen').width,
                    textAlign: 'center'
                }}>
                    {winner.nickname}
                </Text>
                <Text 
                style={{ 
                    color: 'white', 
                    fontSize: 16,
                    width: Dimensions.get('screen').width,
                    textAlign: 'center'
                }}>
                    is the winner!
                </Text>
            </View>
            
            <Text 
            style={{ 
                color: 'white', 
                fontSize: 16,
                marginBottom: 30
            }}>
                {winner.points} points in total
            </Text>
            <Button title='RETURN' onClick={() => navigation.pop()} />
        </View>
    )
}

export default Play