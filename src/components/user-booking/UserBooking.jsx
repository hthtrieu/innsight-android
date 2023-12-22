import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from '@rneui/base';
import { useSelector } from 'react-redux';
import { Input } from '@rneui/themed';
const UserBooking = () => {
    // const { cart } = useSelector(state => state.Booking)
    const { reservation } = useSelector(state => state.Booking)
    return (
        <View style={[styles.card, styles.elevation]}>
            <Input
                value={reservation?.name}
                label="Họ và tên"
                labelStyle={styles.labelStyle}
                inputContainerStyle={styles.inputStyle}
                disabled={true}
            />
            <Input
                label="Số điện thoại"
                value={reservation?.phoneNumber}
                labelStyle={styles.labelStyle}
                inputContainerStyle={styles.inputStyle}
                onChangeText={(text) => setPhoneNumber(text)}
                disabled={true}
            />
            <Input
                value={reservation?.email}
                labelStyle={styles.labelStyle}
                inputContainerStyle={styles.inputStyle}
                onChangeText={(text) => setEmail(text)}
                disabled={true}
            />
        </View>
    )
}

export default UserBooking

const styles = StyleSheet.create({
    flex: {
        display: "flex",
        flexDirection: "row"
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 13,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 45,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: 10,
    },
    elevation: {
        elevation: 10,
        shadowColor: 'rgba(0, 0, 0, 1);',
    },

    textGray: {
        color: "gray",
        fontSize: 14,
    },
    labelStyle: {
        color: "black"
    },
    inputStyle: {
        borderWidth: 1,
        borderRadius: 5
    },
    button: {
        backgroundColor: "#E65300",
        // borderRadius: 5
    }
})