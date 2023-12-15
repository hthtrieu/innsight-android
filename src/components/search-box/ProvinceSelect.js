import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { BottomModal } from "react-native-modals";
import { ModalFooter } from "react-native-modals";
import { ModalButton } from "react-native-modals";
import { ModalTitle } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import VNProvince from '../../utils/VNProvince';
import { ModalContent } from "react-native-modals";
import { useState } from 'react';
const ProvinceSelect = () => {
    const [modalVisible, setmodalVisible] = useState(false)
    return (
        <BottomModal
            swipeThreshold={200}
            onBackdropPress={() => setmodalVisible(!modalVisible)}
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
                        onPress={() => setmodalVisible(!modalVisible)}
                    />
                </ModalFooter>
            }
            modalTitle={<ModalTitle title="Select province" />}
            onHardwareBackPress={() => setmodalVisible(!modalVisible)}
            visible={modalVisible}
            onTouchOutside={() => setmodalVisible(!modalVisible)}
        >
            <ModalContent style={{ width: "100%", height: 310 }}>
                <View>aaa</View>
            </ModalContent>
        </BottomModal>
    )
}

export default ProvinceSelect

const styles = StyleSheet.create({})