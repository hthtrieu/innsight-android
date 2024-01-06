import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Pressable, Modal, ScrollView, Alert } from 'react-native';
// import { Button } from 'react-native';
import { Button } from '@rneui/base';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Autocomplete from 'react-native-autocomplete-input';
import VNProvince from '../../utils/VNProvince';
import DateRangePicker from '../date-range-picker/DateRangePicker';
import { BottomModal } from "react-native-modals";
import { ModalFooter } from "react-native-modals";
import { ModalButton } from "react-native-modals";
import { ModalTitle } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import { ListItem } from '@rneui/base';
import { useDispatch } from 'react-redux';
import HotelAction from '../../redux/hotel/action';
// import DatePicker from "react-native-date-ranges";
import { setSearchParams } from '../../redux/hotel/slice'
const SearchBox = ({ navigation }) => {
    const [openDateModal, setOpenDateModal] = useState(false);
    const [openOptionModal, setOpenOptionModal] = useState(false);
    const [openProvinceModal, setOpenProvinceModal] = useState(false);
    const [provinces, setProvinces] = useState('');
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [startDay, setStartDay] = useState(null);
    const [endDay, setEndDay] = useState(null)
    // const [selectedDates, setSelectedDates] = useState();

    const dispatch = useDispatch();
    const search = () => {
        if (!provinces && !startDay && !endDay) {
            Alert.alert("Xin hãy chọn đầy đủ thông tin")
        }
        else {
            // console.log(startDay, endDay)
            dispatch(setSearchParams({
                province: provinces,
                adults: adults,
                children: children,
                rooms: rooms,
                startDay: startDay,
                endDay: endDay,
            }));

            navigation.navigate('Result')
            // dispatch({
            //     type: HotelAction.SEARCH_HOTELS_START,
            //     province: provinces,
            //     adults: adults,
            //     children: children,
            //     rooms: rooms,
            //     startDay: startDay,
            //     endDay: endDay,
            //     onSuccess: () => {
            //         navigation.navigate('Result')
            //     },
            //     onError: () => {
            //         Alert.alert("Không tìm thấy")
            //     }
            // })
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ ...styles.inputWrapper, position: 'relative' }}>
                <Icon name="location-pin" size={30} color="#004EA9" />
                <Pressable style={styles.input} onPress={() => { setOpenProvinceModal(true) }}>
                    <TextInput
                        placeholderTextColor="black"
                        editable={false}
                        placeholder={`${provinces || "Chọn điểm đến"}`}
                    />
                </Pressable>
            </View>
            <View style={styles.inputWrapper}>
                <TouchableOpacity style={styles.inputWrapper} onPress={() => setOpen(true)}>
                    <Icon name="date-range" size={30} color="#004EA9" />
                </TouchableOpacity>
                <Pressable style={styles.input} onPress={() => { setOpenDateModal(true) }}>
                    <TextInput
                        placeholderTextColor="black"
                        editable={false}
                        placeholder={`${startDay || "Check-in"} -  ${endDay || "Check-out"}`}
                    />

                </Pressable>

            </View>


            <View style={styles.inputWrapper}>
                <Icon name="person" size={30} color="#004EA9" />
                <Pressable style={styles.input} onPress={() => { setOpenOptionModal(true); }}>
                    <TextInput
                        placeholderTextColor="black"
                        editable={false}
                        placeholder={` ${rooms} room • ${adults} adults • ${children} Children`}
                    />
                </Pressable>
            </View>

            <Button
                style={styles.button}
                title="Tìm"
                onPress={search}
            />
            {openDateModal && (
                <>
                    <BottomModal
                        swipeThreshold={200}
                        onBackdropPress={() => setOpenDateModal(!openDateModal)}
                        swipeDirection={["up", "down"]}
                        footer={
                            <ModalFooter>
                                <ModalButton
                                    text="Apply"
                                    style={{
                                        marginBottom: 0,
                                        color: "white",
                                        backgroundColor: "#003580",
                                    }}
                                    onPress={() => setOpenDateModal(!openDateModal)}
                                />
                            </ModalFooter>
                        }
                        modalTitle={<ModalTitle title="Select Date" />}
                        onHardwareBackPress={() => setOpenDateModal(!openDateModal)}
                        visible={openDateModal}
                        onTouchOutside={() => setOpenDateModal(!openDateModal)}
                    >
                        <ModalContent style={{ width: "100%", height: 350 }}>
                            <DateRangePicker handleSave={() => setOpenDateModal(openDateModal)} onEndDay={setEndDay} onStartDay={setStartDay} />

                        </ModalContent>
                    </BottomModal>
                </>
            )}
            {openProvinceModal &&
                (
                    <>
                        <BottomModal
                            swipeThreshold={200}
                            onBackdropPress={() => setOpenProvinceModal(!openProvinceModal)}
                            swipeDirection={["up", "down"]}
                            footer={
                                <ModalFooter>
                                    <ModalButton
                                        text="Apply"
                                        style={{
                                            marginBottom: 0,
                                            color: "white",
                                            backgroundColor: "#003580",
                                        }}
                                        onPress={() => setOpenProvinceModal(!openProvinceModal)}
                                    />
                                </ModalFooter>
                            }
                            modalTitle={<ModalTitle title="Select province" />}
                            onHardwareBackPress={() => setOpenProvinceModal(!openProvinceModal)}
                            visible={openProvinceModal}
                            onTouchOutside={() => setOpenProvinceModal(!openProvinceModal)}
                        >
                            <ModalContent style={{ width: "100%", height: 310 }}>
                                <ScrollView>
                                    {VNProvince.map((p, idx) => (
                                        <TouchableOpacity key={idx} onPress={() => { setProvinces(p.name) }}>
                                            <ListItem >
                                                <ListItem.Content>
                                                    <Text> {p.name}</Text>
                                                </ListItem.Content>
                                            </ListItem>
                                        </TouchableOpacity>

                                    ))}
                                </ScrollView>
                            </ModalContent>
                        </BottomModal>
                    </>
                )
            }
            {openOptionModal &&
                (
                    <>
                        <BottomModal
                            swipeThreshold={200}
                            onBackdropPress={() => setOpenOptionModal(!openOptionModal)}
                            swipeDirection={["up", "down"]}
                            footer={
                                <ModalFooter>
                                    <ModalButton
                                        text="Apply"
                                        style={{
                                            marginBottom: 0,
                                            color: "white",
                                            backgroundColor: "#003580",
                                        }}
                                        onPress={() => setOpenOptionModal(!openOptionModal)}
                                    />
                                </ModalFooter>
                            }
                            modalTitle={<ModalTitle title="Select rooms and guests" />}
                            modalAnimation={
                                new SlideAnimation({
                                    slideFrom: "bottom",
                                })
                            }
                            onHardwareBackPress={() => setOpenOptionModal(!openOptionModal)}
                            visible={openOptionModal}
                            onTouchOutside={() => setOpenOptionModal(!openOptionModal)}
                        >
                            <ModalContent style={{ width: "100%", height: 310 }}>
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
                                            onPress={() => setRooms(Math.max(1, rooms - 1))}
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
                                                {rooms}
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            onPress={() => setRooms((c) => c + 1)}
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

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginVertical: 15,
                                    }}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: "500" }}>Adults</Text>
                                    <Pressable
                                        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                                    >
                                        <Pressable
                                            onPress={() => setAdults(Math.max(1, adults - 1))}
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
                                                {adults}
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            onPress={() => setAdults((c) => c + 1)}
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

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginVertical: 15,
                                    }}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: "500" }}>Children</Text>
                                    <Pressable
                                        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                                    >
                                        <Pressable
                                            onPress={() => setChildren(Math.max(0, children - 1))}
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
                                                {children}
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            onPress={() => setChildren((c) => c + 1)}
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
                        </BottomModal>
                    </>
                )
            }
        </View >
    );
};

export default SearchBox;

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#EEC42D',
        margin: 20,
        padding: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        // flex: 1,
    },
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        borderBottomWidth: 1,
        flex: 1,
    },
    button: {
        backgroundColor: '#4344E5',
        height: 40,
    },
    buttonCancel: {
        backgroundColor: 'red',
        height: 40,
    },
    autocompleContainer: {
        position: "absolute",
        zIndex: 3,
        overflow: "hidden"
    }
});
