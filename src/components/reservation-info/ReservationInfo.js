import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from '@rneui/base';
import { useSelector } from 'react-redux';
const ReservationInfo = () => {
    // const { cart } = useSelector(state => state.Booking)
    const { searchParams, cart } = useSelector(state => state.Hotel)
    return (
        <View style={[styles.card, styles.elevation]}>
            <View style={{ ...styles.flex, justifyContent: "space-between" }}>
                <View style={{ width: "20%", height: "100%", }}>
                    <Image
                        source={{ uri: Array.isArray(cart?.hotel?.hotelImages) ? cart?.hotel?.hotelImages[0] : "" }}
                        containerStyle={styles.image}
                    />
                </View>

                <View style={{ width: "70%", height: "100%", }}>
                    <View style={styles.flex}>
                        <FontAwesome5 name="hotel" size={22} />
                        <Text style={{ fontSize: 22, marginLeft: 10, fontWeight: "700" }}>
                            {cart?.hotel?.hotelName}
                        </Text>
                    </View>
                    <Text>
                        {cart?.hotel?.address || "address"}
                    </Text>
                    <View style={{ ...styles.flex, justifyContent: "space-between" }}>
                        <Text style={styles.textGray}>Ngày nhận phòng</Text>
                        <Text>{searchParams?.checkinDay}</Text>
                    </View>
                    <View style={{ ...styles.flex, justifyContent: "space-between" }}>
                        <Text style={styles.textGray}>Ngày trả phòng</Text>
                        <Text>{searchParams?.checkoutDay}</Text>
                    </View>
                </View>
            </View>
            {cart?.rooms?.map((room, idx) => (
                <View style={{ marginTop: 10 }} key={idx}>
                    <Text style={{ fontSize: 18, fontWeight: "700" }}>
                        {`(${room?.count}x) ${room?.roomName}`}
                    </Text>
                    <View style={{ ...styles.flex, justifyContent: "space-between" }}>
                        <Text style={styles.textGray}>Khách/Phòng</Text>
                        <Text>{`${room?.adult} người lớn - ${room?.children} trẻ em`}</Text>
                    </View>
                    {/* <View style={{ ...styles.flex, justifyContent: "space-between" }}>
                        <Text style={styles.textGray}>Kiểu giường</Text>
                        <Text>...</Text>
                    </View> */}
                </View>
            ))}
        </View>
    )
}

export default ReservationInfo

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
    image: {
        aspectRatio: 1,
        width: '100%',
        flex: 1,
    },
    textGray: {
        color: "gray",
        fontSize: 14,
    }
})