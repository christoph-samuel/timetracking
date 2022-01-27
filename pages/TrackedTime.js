import React from 'react';
import moment from 'moment';
import {StyleSheet, Text, TextInput, View} from "react-native";
import CustomButton from './components/Button';
// import MaterialChip from "react-native-material-chip";


function TrackedTime({id, title, start, stop, onDelete, tags}) {
    return (
        <View style={styles.table}>
            <TextInput defaultValue={title} style={styles.title}/>
            <Text>{moment.isMoment(start) && start.format("DD.MM.YYYY, HH:mm") || ':/'}</Text>
            <Text>–</Text>
            <Text>{moment.isMoment(stop) && stop.format("DD.MM.YYYY, HH:mm") || ':('}</Text>
            <Text>{moment.utc(stop.diff(start)).format("HH:mm:ss") || ':O'}</Text>

            {/*<MaterialChip*/}
            {/*    text={chip}*/}
            {/*    onDelete={(event) => console.log(event, id)}*/}
            {/*    textStyle={{color: 'rgba(0, 0, 0, 0.87)'}}*/}
            {/*    rightIcon={*/}
            {/*        <View*/}
            {/*            style={{*/}
            {/*                height: MaterialChip.CHIP_RIGHT_ICON_SIZE,*/}
            {/*                width: MaterialChip.CHIP_RIGHT_ICON_SIZE,*/}
            {/*                borderRadius: MaterialChip.CHIP_RIGHT_ICON_RADIUS,*/}
            {/*                backgroundColor: 'rgba(252,0,0,1)',*/}
            {/*                borderWidth: 0*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    }*/}
            {/*/>*/}

            <CustomButton title="Delete" onPress={(event) => onDelete(event, id)} backgroundColor="#f00" paddingH='8'
                          paddingV='8' weight='500'/>

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
        minWidth: '40%',
        // outlineStyle: 'none'
    }
})

export default TrackedTime;