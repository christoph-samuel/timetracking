import React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import CustomButton from './components/Button';
import moment from 'moment';
import TrackedTime from './TrackedTime';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog, {DialogTitle, DialogContent, DialogFooter, DialogButton, ScaleAnimation} from 'react-native-popup-dialog';

function TimeTracker() {
    const [trackedTimes, setTrackedTimes] = useState([]);
    const [startTime, setStartTime] = useState(moment(0));
    const [title, setTitle] = useState('-- No title given --');
    const [isTracking, setIsTracking] = useState(false);

    const [currentTime, setCurrentTime] = useState(moment.utc(0));
    const [intervalId, setIntervalId] = useState(null);

    const [render, setRender] = useState(true)

    const [tagPopup, setTagPopup] = useState(null)
    const [tagText, setTagText] = useState(null);

    useEffect(() => {
        if (render) {
            loadData()
            setRender(false)
        }
    }, [render, trackedTimes])

    async function loadData() {
        try {
            const keys = await AsyncStorage.getAllKeys()
            let arr = []
            for (let i = 0; i < keys.length; i++) {
                const value = JSON.parse(await AsyncStorage.getItem(keys[i]))
                arr = [{
                    'id': value.id,
                    'start': moment(value.start),
                    'stop': moment(value.stop),
                    'title': value.title,
                    'tags': value.tags
                }, ...arr]
            }
            setTrackedTimes(arr)
        } catch (e) {
            console.log("Error:", e)
        }
    }

    async function storeData(value) {
        try {
            await AsyncStorage.setItem(value.id, JSON.stringify(value))
            loadData()
        } catch (e) {
            console.log("Error:", e)
        }
    }

    async function deleteData(event, id) {
        try {
            await AsyncStorage.removeItem(id)
            loadData()
        } catch (e) {
            console.log("Error:", e)
        }
    }

    async function editTitle(event, id, title) {
        try {
            let data = JSON.parse(await AsyncStorage.getItem(id))
            data.title = title
            await AsyncStorage.setItem(id, JSON.stringify(data))
            loadData()
        } catch (e) {
            console.log("Error:", e)
        }
    }

    async function addTag(id, text) {
        try {
            let data = JSON.parse(await AsyncStorage.getItem(id))
            data.tags = [text, ...data.tags]
            await AsyncStorage.setItem(id, JSON.stringify(data))
            loadData()
            setTagPopup(null)
        } catch (e) {
            console.log("Error:", e)
        }
    }

    return (
        <View style={styles.topbarContainer}>
            <View style={styles.topbar}>
                <TextInput
                    style={styles.input}
                    placeholder="Write your title here..."
                    onChangeText={newText => setTitle(newText)}
                />
                <Text style={styles.time}>{currentTime.format('HH:mm:ss')}</Text>
                <View style={styles.topbarButtonsContainer}>
                    {!isTracking ?
                        <CustomButton
                            title="Start"
                            onPress={() => {
                                const current = moment()
                                setStartTime(current)
                                setIsTracking(true)
                                setIntervalId(setInterval(() => {
                                    setCurrentTime(moment.utc(moment().diff(current)))
                                }, 100))
                            }}
                            backgroundColor="#0f0"
                        />
                        :
                        <CustomButton
                            title="Stop"
                            onPress={() => {
                                storeData({
                                    'id': Math.random()+'',
                                    'start': startTime,
                                    'stop': moment(),
                                    'title': title,
                                    'tags': []
                                })
                                setStartTime(moment(0))
                                setCurrentTime(moment.utc(0))
                                setIsTracking(false)
                                clearInterval(intervalId)
                                setIntervalId(null)
                            }}
                            backgroundColor="#f00"
                        />
                    }
                </View>
            </View>

            <View>
                {trackedTimes.map((i) => <TrackedTime key={i.id} id={i.id} title={i.title} start={i.start} stop={i.stop}
                                                      editTitle={editTitle} addTag={() => setTagPopup(i.id)}
                                                      deleteData={deleteData} tags={i.tags}/>)}
            </View>

            <Dialog
                visible={tagPopup !== null}
                dialogAnimation={new ScaleAnimation({
                    initialValue: 0, // optional
                    useNativeDriver: true, // optional
                })}
                onTouchOutside={() => {
                    setTagPopup(null)
                }}>
                <DialogTitle title="Bitte den Tag Namen eingeben:"/>
                <DialogContent style={styles.dialogContent}>
                    <TextInput onChangeText={setTagText} style={[styles.input, styles.dialogInput]}/>
                </DialogContent>
                <DialogFooter>
                    <DialogButton
                        text="Close"
                        onPress={() => {setTagPopup(null)}}
                    />
                    <DialogButton
                        text="Add"
                        onPress={() => {addTag(tagPopup, tagText)}}
                    />
                </DialogFooter>
            </Dialog>
        </View>
    );
}

const styles = StyleSheet.create({
    topbarContainer: {
        width: '100%'
    },
    topbar: {
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 1)',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    topbarButtonsContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
    },

    time: {
        fontSize: 20,
        marginHorizontal: 20
    },

    input: {
        fontSize: 20,
        height: '100%',
        width: '100%',
        padding: 10,
    },

    dialogInput: {
        textAlign: 'center',
    },

    dialogContent: {
        padding: 20,
    },
})

export default TimeTracker