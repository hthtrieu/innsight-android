import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { AntDesign, Entypo } from "@expo/vector-icons";
const Invoice = () => {
    const navigation = useNavigation();
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
    return (
        <ScrollView style={styles.bg}>
            <View>
                <Text style={{ color: "#003B95", fontSize: 20, fontWeight: "700", marginTop: 10 }}>
                    {bookingReserved?.hotelName || "hotel name"}
                </Text>
                <View style={styles.flex_between}>
                    <View>
                        <Text style={styles.title}>Ngày nhận phòng</Text>
                        <Text>{bookingReserved?.startDay ? `${bookingReserved?.startDay}-${bookingReserved?.checkInTime}` : "start day"}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Ngày trả phòng</Text>
                        <Text>{bookingReserved?.startDay ? `${bookingReserved?.endDay}-${bookingReserved?.checkOutTime}` : "end day"}</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.flex_between}>
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
                    <View style={styles.flex_between}>
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
                <View style={{ ...styles.flex_between }}>
                    <Text style={{ ...styles.title, ...styles.colorRed }}>Tổng cộng</Text>
                    <Text style={{ ...styles.title, ...styles.colorRed }}>{bookingReserved?.total || "Tổng tiền"}</Text>
                </View>
            </View>
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
    },
    subTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginTop: 10,
    },
    colorRed: {
        fontWeight: "700",
        color: "red"
    }

})