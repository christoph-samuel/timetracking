import {StyleSheet, View, ImageBackground} from 'react-native'
import './pages/TimeTracker'
import TimeTracker from "./pages/TimeTracker";
import Orientation from "react-native-orientation";
import {useEffect} from 'react';

export default function App() {
    const image = require("./assets/background.jpg")

    // useEffect(() => {
    //     console.log(Orientation)
    //     alert("Hund: " + Orientation.getInitialOrientation())
    //     const initial = Orientation.getInitialOrientation()
    //     alert(initial)
    //     Orientation.addOrientationListener(orientationChange)
    //     Orientation.lockToLandscapeRight()
    // }, []);

    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <TimeTracker style={styles.content}/>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "hidden"
    },
    image: {
        flex: 1
    },
    content: {
        flex: 1
    }
})
