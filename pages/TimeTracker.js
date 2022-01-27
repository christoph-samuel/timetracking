import React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import CustomButton from './components/Button';
import moment from 'moment';
import TrackedTime from "./TrackedTime";

function TimeTracker() {
    const [trackedTimes, setTrackedTimes] = useState([]);
    const [startTime, setStartTime] = useState(moment(0));
    const [title, setTitle] = useState('-- No title given --');
    const [isTracking, setIsTracking] = useState(false);

    const [currentTime, setCurrentTime] = useState(moment.utc(0));
    const [intervalId, setIntervalId] = useState(null);

    function onDelete(event, id) {
        setTrackedTimes(trackedTimes.filter((i) => i.id !== id))
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
                                setStartTime(current);
                                setIsTracking(true);
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
                                setTrackedTimes([{
                                    'id': Math.random(),
                                    'start': startTime,
                                    'stop': moment(),
                                    'title': title
                                }, ...trackedTimes]);
                                setStartTime(moment(0));
                                setCurrentTime(moment.utc(0))
                                setIsTracking(false);
                                clearInterval(intervalId);
                                setIntervalId(null);
                            }}
                            backgroundColor="#f00"
                        />
                    }
                </View>
            </View>

            <View>
                {trackedTimes.map((i) => <TrackedTime key={i.id} id={i.id} title={i.title} start={i.start} stop={i.stop}
                                                      onDelete={onDelete} tags="Example"/>)}
            </View>
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
        marginHorizontal: 10,
        // outlineStyle: 'none',
        padding: 10,
    },
})

export default TimeTracker