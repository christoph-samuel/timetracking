import {StyleSheet, View, ImageBackground} from 'react-native'
import './pages/TimeTracker'
import TimeTracker from "./pages/TimeTracker";

export default function App() {
    const image = require("./assets/background.jpg")

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
