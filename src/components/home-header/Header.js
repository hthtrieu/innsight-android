import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>InnSight</Text>
            </View>
        )
    }
}

export default Header

const styles = StyleSheet.create({
});





