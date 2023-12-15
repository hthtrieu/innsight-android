import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Navbar extends Component {
    render() {
        return (
            <View>
                <Text> navbar </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "fixed",
        bottom: 0,
    }
})
