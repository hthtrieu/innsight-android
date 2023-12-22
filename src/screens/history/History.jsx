import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from "@expo/vector-icons";

const History = () => {
    return (
        <ScrollView style={styles.bg}>
            <Text>History</Text>
        </ScrollView>
    )
}

export default History

const styles = StyleSheet.create({
    bg: {
        backgroundColor: "white",
        height: "100%"
    }
})