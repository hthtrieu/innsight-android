import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ReservationInfo from '../../components/reservation-info/ReservationInfo'
import ReservationPrice from '../../components/reservation-price/ReservationPrice'
import UserBooking from '../../components/user-booking/UserBooking'
import { Button } from '@rneui/base'
import { useSelector, useDispatch } from 'react-redux'
import BookingAction from '../../redux/booking/action'
import { useNavigation } from "@react-navigation/native";

const CheckReservation = () => {
    const dispatch = useDispatch();
    const { reservation } = useSelector(state => state.Booking)
    const navigation = useNavigation();
    useEffect(() => {
        if (!reservation?.hotelId) {
            navigation.navigate('Home')
        }
    }, [reservation])
    return (
        <ScrollView>
            <ReservationInfo />
            <UserBooking />
            <ReservationPrice />
            <Button
                buttonStyle={
                    styles.button
                }
                onPress={() => {
                    dispatch({
                        type: BookingAction.BOOKING_START,
                        reservation: reservation,
                        onSuccess: () => {
                            Alert.alert("Đặt thành công")
                            navigation.navigate('Invoice')
                        },
                        onError: () => {
                            Alert.alert("Xảy ra lỗi trong lúc đặt")
                        }
                    })

                }}
            >
                Đặt phòng
            </Button>
        </ScrollView>
    )
}

export default CheckReservation

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#E65300",
    }
})