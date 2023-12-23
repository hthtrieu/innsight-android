import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const InvoiceBlock = ({ data }) => {
    return (
        <View style={{ ...styles.elevation, ...styles.card }}>

            {/* <Image ></Image> */}
            <View style={{ ...styles.flex, justifyContent: "space-between" }}>
                <Image
                    style={{ height: 100, width: 100 }}
                    source={{ uri: data?.imagePath || "" }}
                />
                <View>
                    <Text style={styles.textGray}>{data?.hotelName}</Text>
                    <Text>{data?.province}</Text>
                    <Text>{`Check in: ${data?.startDay} ${data?.checkInTime}`}</Text>
                    <Text>{`Check out: ${data?.endDay} ${data?.checkOutTime}`}</Text>
                    <Text>{`Total: ${data?.total} VND`}</Text>
                </View>
            </View>

        </View>
    )
}

export default InvoiceBlock

const styles = StyleSheet.create({
    flex: {
        display: "flex",
        flexDirection: "row"
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