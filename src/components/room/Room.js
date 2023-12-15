import { FlatList, StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Card } from '@rneui/base'
import { FontAwesome5 } from "@expo/vector-icons";
import { ModalContent, BottomModal, ModalFooter, ModalButton, ModalTitle } from 'react-native-modals';
import { useDispatch, useSelector } from 'react-redux';
import { addRoomToCart } from "../../redux/hotel/slice"
const Room = ({ room }) => {
    const { hotel } = useSelector(state => state.Hotel);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
    }, [hotel])
    const handleAddRoomToCart = () => {
        dispatch({
            type: addRoomToCart,
            payload: {
                hotel: hotel,
                room: room,
                count: quantity,

            }
        })
    }

    return (
        <>
            <View >
                <Text style={styles.label}>{room?.roomName}</Text>
                <View style={styles.container}>
                    {/* room image */}
                    <View style={styles.hotelImage}>
                        <Card style={{ padding: 0 }}>
                            <Card.Image
                                source={{
                                    uri: room?.roomImage || ""
                                }}
                            />
                            {room?.roomAmenities?.map((amenity, idx) => (
                                <Text key={idx}>{amenity}</Text>
                            ))}
                        </Card>
                    </View>

                    {/* room details */}
                    <View style={styles.hotelDetail}>
                        <View style={styles.container}>
                            <Text style={styles.label}>Giá này bao gồm</Text>
                            <Text>{`Sức chứa:${room?.adult} người lớn, ${room?.children} trẻ em`}</Text>
                        </View>
                        <View>
                            {room?.roomAmenities?.map((amenity, idx) => (
                                <View key={idx} style={{ ...styles.container, justifyContent: "flex-start", marginTop: 5, alignItems: "center" }}>
                                    <FontAwesome5 name="check" size={14} color="blue" />
                                    <Text style={{ marginLeft: 5 }}>{amenity}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.container}>
                            <View>
                                <Text style={styles.label}>Giá phòng hôm nay</Text>
                                <Text style={{ fontSize: 18, fontWeight: "700", color: "red" }}>{room?.price} VND</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>Chọn số lượng phòng</Text>
                                <Pressable style={styles.input} onPress={() => { setModalVisible(!modalVisible) }}>
                                    <TextInput
                                        placeholderTextColor="orange"
                                        editable={false}
                                        placeholder={` ${quantity}`}
                                    />
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <Text style={{ fontSize: 10 }}>Đã bao gồm thuế và phí</Text>
                            <Button
                                titleStyle={
                                    {
                                        color: 'black'
                                    }
                                }
                                buttonStyle={
                                    {
                                        width: 100
                                    }
                                }
                                onPress={(event) => { event.preventDefault(); handleAddRoomToCart(); }}
                            >Chọn</Button>
                        </View>
                    </View>
                </View>
            </View >
            <BottomModal
                swipeThreshold={200}
                onBackdropPress={() => setModalVisible(!modalVisible)}
                swipeDirection={["up", "down"]}
                footer={
                    <ModalFooter>
                        <ModalButton
                            text="Apply"
                            style={{
                                marginBottom: 20,
                                color: "white",
                                backgroundColor: "#003580",
                            }}
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </ModalFooter>
                }
                modalTitle={<ModalTitle title="Select rooms" />}
                onHardwareBackPress={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(!modalVisible)}
            >
                <ModalContent>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginVertical: 15,
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Rooms</Text>
                        <Pressable
                            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                        >
                            <Pressable
                                onPress={() => setQuantity(Math.max(0, quantity - 1))}
                                style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: 13,
                                    borderColor: "#BEBEBE",
                                    backgroundColor: "#E0E0E0",
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 20,
                                        fontWeight: "600",
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    -
                                </Text>
                            </Pressable>

                            <Pressable>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 18,
                                        fontWeight: "500",
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    {quantity}
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => setQuantity((c) => Math.min(room.quantity, quantity + 1))}
                                style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: 13,
                                    borderColor: "#BEBEBE",
                                    backgroundColor: "#E0E0E0",
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 20,
                                        fontWeight: "600",
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    +
                                </Text>
                            </Pressable>
                        </Pressable>
                    </View>
                </ModalContent>
            </BottomModal >
        </>

    )
}

export default Room

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        padding: 0,
        flexWrap: "wrap"
    },
    label: {
        fontSize: 16,
        fontWeight: '700',
    },
    hotelImage: {
        width: "40%",
        padding: 0,
    },
    hotelDetail: {
        width: "60%"
    }
})