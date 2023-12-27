import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import ReservationInfo from '../../components/reservation-info/ReservationInfo'
import ReservationPrice from '../../components/reservation-price/ReservationPrice'
import { Input } from '@rneui/themed';
import { Button } from '@rneui/base';
import { useSelector } from 'react-redux';
import Constants from '../../utils/Constants';
import { useDispatch } from 'react-redux';
import { saveReservation } from '../../redux/booking/slice';
const Booking = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    // const { cart } = useSelector(state => state.Booking)
    const { searchParams, cart } = useSelector(state => state.Hotel)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Đặt phòng khách sạn",
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
            },
            headerStyle: {
                height: 110,
                borderBottomColor: "transparent",
                shadowColor: "transparent",
            },
            headerTitleAlign: 'center',
        });
    }, []);
    const onSubmitReservation = () => {
        const total = cart.rooms.reduce((acc, room) => (
            acc + (room?.price * parseInt(room?.count || 0, 10))
        ), 0);
        const totalWithTax = total + total * Constants.tax / 100;
        const reservation = {
            hotelId: cart?.hotel?.id,
            note: "",
            name: fullName,
            email: email,
            phoneNumber: phoneNumber,
            paymentMethod: "cash",
            roomTypeReservedList: cart?.rooms.map(item => ({
                id: item.id,
                count: parseInt(item.count),
                price: item.price
            })),
            totalPrice: total,
            tax: Constants.tax,
            vat: parseFloat(totalWithTax.toFixed(3)),
            startDay: searchParams?.checkinDay,
            endDay: searchParams?.checkoutDay
        }
        if (fullName && email && phoneNumber) {
            dispatch(saveReservation(
                {
                    reservation: reservation,
                }
            ))
            navigation.navigate('Reservation')

        }


    }
    return (
        <ScrollView style={styles.bgWhite}>
            <ReservationInfo />
            <View>
                <Input
                    placeholder=''
                    label="Họ và tên"
                    labelStyle={styles.labelStyle}
                    inputContainerStyle={styles.inputStyle}
                    onChangeText={(text) => setFullName(text)}
                />
                <Input
                    placeholder=''
                    label="Số điện thoại"
                    labelStyle={styles.labelStyle}
                    inputContainerStyle={styles.inputStyle}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
                <Input
                    placeholder=''
                    label="Địa chỉ email"
                    labelStyle={styles.labelStyle}
                    inputContainerStyle={styles.inputStyle}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <ReservationPrice />
            <Button
                buttonStyle={
                    styles.button
                }
                onPress={onSubmitReservation}
            >
                Tiếp tục
            </Button>
        </ScrollView>
    )
}

export default Booking

const styles = StyleSheet.create({
    bgWhite: {
        backgroundColor: "#FFF"
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