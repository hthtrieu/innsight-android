import { BottomModal } from "react-native-modals";
import { ModalFooter } from "react-native-modals";
// import { SlideAnimation } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import { ModalTitle } from "react-native-modals";

// import MockHotelData from '../../redux/hotel/mock-data/HotelDetails'
import { Pressable, ScrollView, StyleSheet, Text, View, Image, TextInput } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { Octicons } from "@expo/vector-icons";
// import { Ionicons } from "@expo/vector-icons";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { FontAwesome } from '@expo/vector-icons';
// import { Entypo } from "@expo/vector-icons";
// import PropertyCard from "../../components/property-card/PropertyCard";
import Room from "../../components/room/Room";
import { Button } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import HotelAction from "../../redux/hotel/action";
const HotelDetails = ({ route }) => {
    const { hotelId } = route.params;
    const { hotel, searchParams, cart } = useSelector(state => state.Hotel)
    // const { cart } = useSelector(state => state.Booking)
    const navigation = useNavigation();
    const [modalVisibile, setModalVisibile] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch();

    useEffect(() => {
        if (hotelId) {
            dispatch({
                type: HotelAction.GET_HOTEL,
                hotelId: hotelId,
                checkInDay: searchParams.checkinDay,
                checkOutDay: searchParams.checkoutDay,
                onSuccess: () => {
                },
                onError: () => {
                }
            });
        }
    }, [hotelId]);
    useEffect(() => {
        if (cart?.rooms?.length) {
            const total = cart.rooms.reduce((acc, room) => (
                acc + (room?.price * parseInt(room?.count || 0, 10))
            ), 0);
            setTotalPrice(total);
        }
        else {
            setTotalPrice(0)
        }
    }, [cart, hotel]);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: hotel?.hotelName || "Hotel",
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
            },
            headerStyle: {
                height: 110,
                borderBottomColor: "transparent",
                shadowColor: "transparent",
            },
        });
    }, [hotel]);


    // useEffect(() => {
    //     if (cart?.rooms?.length) {
    //         const total = cart.rooms.reduce((acc, room) => (
    //             acc + (room?.price * parseInt(room?.count || 0, 10))
    //         ), 0);
    //         setTotalPrice(total)
    //     }
    // }, [cart]);
    const handleGotoBooking = () => {
        if (totalPrice) {
            navigation.navigate('Booking')
        }
    }
    return (
        <>
            <ScrollView style={{ backgroundColor: "white", padding: 10 }}>
                <Pressable
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                        padding: 12,
                        backgroundColor: "white",
                    }}
                >
                    {/* <Pressable
                        onPress={() => setModalVisibile(!modalVisibile)}
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Octicons name="arrow-switch" size={22} color="gray" />
                        <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
                            Sort
                        </Text>
                    </Pressable> */}

                    {/* <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="filter" size={22} color="gray" />
                        <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
                            Price
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate("Map", {
                        searchResults: searchPlaces,
                    })} style={{ flexDirection: "row", alignItems: "center" }}>
                        <FontAwesome5 name="map-marker-alt" size={22} color="gray" />
                        <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
                            Map
                        </Text>
                    </Pressable> */}
                </Pressable>

                <ScrollView >
                    {/* hotel images */}
                    <View style={styles.section}>
                        {hotel?.hotelImages?.map((image, idx) => (
                            <Image key={idx} />
                        ))}
                    </View>
                    {/* hotel description */}
                    <View style={styles.section}>
                        <Text style={styles.label}>Giới thiệu cơ sở lưu trú</Text>
                        <Text>
                            {hotel?.description}
                        </Text>
                    </View>
                    {/* room list */}
                    <View style={styles.section}>
                        {Array.isArray(hotel?.roomList) && hotel?.roomList?.map((room, idx) => (
                            <Room key={idx} room={room} />
                        ))}
                    </View>
                </ScrollView>

                <BottomModal
                    onBackdropPress={() => setModalVisibile(!modalVisibile)}
                    swipeDirection={["up", "down"]}
                    swipeThreshold={200}
                    footer={
                        <ModalFooter>
                            <Pressable
                                onPress={() => applyFilter(selectedFilter)}
                                style={{
                                    paddingRight: 10,
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginVertical: 10,
                                    marginBottom: 30
                                }}
                            >
                                <Text>Apply</Text>
                            </Pressable>
                        </ModalFooter>
                    }
                    modalTitle={<ModalTitle title="Sort and Filter" />}
                    onHardwareBackPress={() => setModalVisibile(!modalVisibile)}
                    visible={modalVisibile}
                    onTouchOutside={() => setModalVisibile(!modalVisibile)}
                >
                    <ModalContent style={{ width: "100%", height: 280 }}>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{
                                    marginVertical: 10,
                                    flex: 2,
                                    height: 280,
                                    borderRightWidth: 1,
                                    borderColor: "#E0E0E0",
                                }}
                            >
                                <Text style={{ textAlign: "center" }}>Sort </Text>
                            </View>

                            <View style={{ flex: 3, margin: 10 }}>

                            </View>
                        </View>
                    </ModalContent>
                </BottomModal>
            </ScrollView>
            <View style={{ ...styles.flex, padding: 10, backgroundColor: "#FFF" }}>
                <TextInput style={{ color: "#E65503", fontSize: 18, fontWeight: "700" }}>
                    {`${totalPrice} VND`}
                </TextInput>
                <Button
                    titleStyle={
                        {
                            color: "black"
                        }
                    }
                    buttonStyle={
                        {
                            backgroundColor: "#EBB97E"
                        }
                    }
                    onPress={(event) => {
                        event.preventDefault();
                        handleGotoBooking();
                    }}
                >
                    Đặt phòng
                </Button>
            </View>
        </>

    )
}

export default HotelDetails

const styles = StyleSheet.create({
    flexCol: {
        display: "flex",
        flexDirection: "column"
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    section: {
        marginTop: 20,
        backgroundColor: "#fff"
    },
    label: {
        fontSize: 20,
        fontWeight: '700',
    }
})