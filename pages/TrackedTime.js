import React, {useState} from 'react';
import moment from 'moment';
import {StyleSheet, Text, TextInput, View} from "react-native";
import CustomButton from './components/Button';


function TrackedTime({id, title, start, stop, deleteData, addTag, editTitle, tags}) {
    const [newTitle, setTitle] = useState(title);

    return (
        <View style={styles.table}>
            <TextInput defaultValue={title} onChangeText={setTitle}
                       onSubmitEditing={(event) => editTitle(event, id, newTitle)}
                       style={[styles.title, styles.margin]}/>

            <Text style={[styles.tags, styles.margin]}>{tags.join(', ')}</Text>

            <CustomButton title="+" onPress={(event) => addTag(event, id)} backgroundColor="#000" paddingH='10'
                          paddingV='10'/>

            <Text
                style={[styles.time, styles.margin]}>{moment.isMoment(start) && start.format("DD.MM.YYYY, HH:mm") || ':/'} - {moment.isMoment(stop) && stop.format("HH:mm") || ':('}</Text>
            <Text style={[styles.diff, styles.margin]}>{moment.utc(stop.diff(start)).format("HH:mm:ss") || ':O'}</Text>

            <CustomButton title="Delete" onPress={(event) => deleteData(event, id)} backgroundColor="#f00" paddingH='8'
                          paddingV='8' weight='500' style={styles.margin}/>
        </View>
    );
}

const styles = StyleSheet.create({
    table: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 25,
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        fontSize: 30,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },

    title: {
        minWidth: '30%',
        padding: 20,
        fontSize: 15,
    },

    tags: {
        maxWidth: '15%'
    },

    time: {
        fontSize: 15,
    },

    diff: {
        fontSize: 15,
    },

    margin: {
        marginHorizontal: 5,
    }
})

export default TrackedTime;