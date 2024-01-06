import { StyleSheet, Text, View, ScrollView, Image, Alert } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import BookingAction from '../../redux/booking/action';
const Invoice = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Innsight',
            headerStyle: {
                backgroundColor: '#D5F0F9',
            },
            headerTintColor: '#3A1568',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',

        });
    }, [navigation]);

    const { bookingReserved } = useSelector(state => state.Booking)
    console.log(bookingReserved)
    const handleCancelInvoice = () => {
        dispatch({
            type: BookingAction.RESERVATION_CANCEL,
            reservationCode: bookingReserved.reservationCode,
            onSuccess: () => {
                Alert.alert("Huỷ thành công")
            },
            onError: () => {
                Alert.alert("Huỷ thất bại")
            }
        })
    }
    return (
        <ScrollView style={styles.bg}>
            <Text style={{ color: "#003B95", fontSize: 20, fontWeight: "700", marginTop: 10 }}>
                {bookingReserved?.hotelName || "hotel name"}
            </Text>
            <Image
                style={styles.image}
                source={{ uri: bookingReserved?.imagePath || "" }}
            />
            <View style={styles.flex_between}>
                <View>
                    <Text style={{ ...styles.title, marginLeft: 0 }}>Ngày nhận phòng</Text>
                    <Text>{bookingReserved?.startDay ? `${bookingReserved?.startDay}` : ""}</Text>
                    <Text>{bookingReserved?.checkInTime ? `${bookingReserved?.checkInTime}` : "start day"}</Text>
                </View>
                <View>
                    <Text style={{ ...styles.title, marginLeft: 0 }}>Ngày trả phòng</Text>
                    <Text>{bookingReserved?.endDay ? `${bookingReserved?.endDay}` : ""}</Text>
                    <Text>{bookingReserved?.checkOutTime ? `${bookingReserved?.checkOutTime}` : "end day"}</Text>
                </View>
            </View>
            <View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", alignContent: "center" }}>
                    <AntDesign name="edit" size={24} color="#003B95" />
                    <Text style={styles.title}>Chi tiết đặt phòng</Text>
                </View>
                {Array.isArray(bookingReserved?.roomList) && bookingReserved?.roomList?.map((room, idx) => (
                    <View key={idx}>
                        <Text style={styles.subTitle}>{room?.name || "room name"}</Text>
                        <Text>{room?.adultCount ? `${room?.adultCount} Người lớn-${room?.childrenCount} Trẻ em` : 'adult-childrent'}</Text>
                    </View>
                ))}
            </View>
            <View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", alignContent: "center" }}>
                    <Entypo name="location" size={24} color="#003B95" />
                    <Text style={styles.title}>Địa chỉ</Text>
                </View>
                <Text>
                    {bookingReserved?.address ? `${bookingReserved?.address}, ${bookingReserved?.province}` : "address"}
                </Text>
            </View>
            <View >
                <Text style={styles.title}>Chi tiết</Text>
                <Text>
                    {bookingReserved?.description || "description"}
                </Text>
            </View>
            <View style={{ ...styles.flex_between, paddingBottom: 20 }}>
                <Text style={{ ...styles.title, ...styles.colorRed }}>Tổng cộng</Text>
                <Text style={{ ...styles.title, ...styles.colorRed }}>{`${(bookingReserved.total).toLocaleString('vi-VN')} VND` || "Tổng tiền"}</Text>
            </View>
            <Button
                title='Huỷ phòng'
                onPress={() => {
                    handleCancelInvoice();
                }}>

            </Button>
        </ScrollView >
    )
}

export default Invoice

const styles = StyleSheet.create({
    bg: {
        backgroundColor: "#FFF",
        padding: 10
    },
    flex_between: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 10,
        marginLeft: 10,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginTop: 10,
    },
    colorRed: {
        fontWeight: "700",
        color: "red"
    },
    image: {
        // aspectRatio: 1,
        width: "100%",
        height: 200,
        flex: 1,
        objectFit: "cover"
    },

})