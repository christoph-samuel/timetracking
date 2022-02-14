import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
    const { onPress, title = 'Button', backgroundColor, paddingH = '30',paddingV = '15', weight = '900' } = props;
    let buttonSytle = StyleSheet.compose(styles.button, {
        backgroundColor: backgroundColor,
        paddingHorizontal: parseInt(paddingH),
        paddingVertical: parseInt(paddingV)
    })

    let buttonTextStyle = StyleSheet.compose(styles.text, {
        fontWeight: weight
    })

    return (
        <Pressable style={[styles.button, buttonSytle]} onPress={onPress}>
            <Text style={[styles.text, buttonTextStyle]}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    text: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});