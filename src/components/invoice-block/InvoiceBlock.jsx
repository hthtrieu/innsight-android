import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import BookingAction from '../../redux/booking/action';
import { Alert } from 'react-native';
const InvoiceBlock = ({ data }) => {
    console.log(data)
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const handleClick = (code) => {
        dispatch({
            type: BookingAction.RESERVATION_DETAIL,
            requestData: code,
            onSuccess: () => {
                navigation.navigate('Invoice')
            },
            onError: () => {
                Alert.alert("Xảy ra lỗi")
            }
        })
    }
    return (
        <Pressable
            onPress={() => { handleClick(data?.reservationCode) }}
            style={{ ...styles.elevation, ...styles.card }}>
            <View style={{ ...styles.flex, justifyContent: "center" }}>
                <Image
                    style={styles.image}
                    source={{ uri: data?.imagePath || "" }}
                />

            </View>
            <View style={{ marginTop: 10, padding: 10 }}>
                <Text style={styles.textGray}>{data?.hotelName}</Text>
                <Text>{data?.province}</Text>
                <Text>{`Check in: ${data?.startDay} ${data?.checkInTime}`}</Text>
                <Text>{`Check out: ${data?.endDay} ${data?.checkOutTime}`}</Text>
                <Text style={{ color: "red" }}>{`Total: ${data?.total.toLocaleString('vi-VN')} VND`}</Text>
            </View>
        </Pressable>
    )
}

export default InvoiceBlock

const styles = StyleSheet.create({
    flex: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 20,
        // paddingHorizontal: 25,
        width: '100%',
        marginVertical: 10,
    },
    elevation: {
        elevation: 10,
        shadowColor: 'rgba(0, 0, 0, 1);',
        padding: 10
    },
    image: {
        // aspectRatio: 1,
        width: "100%",
        height: 200,
        flex: 1,
        objectFit: "cover"
    },
    textGray: {
        color: "gray",
        fontSize: 16,
    }
})