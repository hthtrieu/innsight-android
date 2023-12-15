import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Const from '../../utils/Constants'
const ReservationPrice = () => {
    // const { cart } = useSelector(state => state.Booking)
    const { cart } = useSelector(state => state.Hotel)
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        if (cart?.rooms?.length) {
            const total = cart.rooms.reduce((acc, room) => (
                acc + (room?.price * parseInt(room?.count || 0, 10))
            ), 0);
            const totalWithTax = total + total * Const.tax / 100;
            setTotalPrice(totalWithTax.toFixed(3))
        }
    }, [cart]);
    return (
        <View style={[styles.card, styles.elevation]}>
            <View style={{ ...styles.flex, justifyContent: "space-between" }}>
                <Text style={styles.heading}>
                    Thành tiền
                </Text>
                <Text style={{ ...styles.heading, color: "red" }}>
                    {`${totalPrice} VND`}
                </Text>
            </View>
            {cart.rooms?.map((room, idx) => (
                <View key={idx} style={styles.flex}>
                    <Text>{`(${room?.count})x ${room?.roomName}`}</Text>
                    <Text>{`${room?.price} VND`}</Text>
                </View>
            ))}
            <View style={styles.flex}>
                <Text>{`Thuế và phí`}</Text>
                <Text>{`${Const.tax}%`}</Text>
            </View>
        </View>
    )
}

export default ReservationPrice

const styles = StyleSheet.create({
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
    flex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
})