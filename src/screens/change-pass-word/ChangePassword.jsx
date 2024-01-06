import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Input, Button } from '@rneui/themed';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserAction from '../../redux/user/action';
import { useNavigation } from '@react-navigation/native';
const ChangePassword = () => {
    const { token } = useSelector(state => state.Auth)
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [currentPassword, setCurrentPw] = useState();
    const [newPassword, setNewPw] = useState();
    const [confirmationPassword, setConfirmPw] = useState();
    const handleSubmit = () => {
        if (confirmationPassword != newPassword) {
            Alert.alert("Mật khẩu mới không giống nhau")
        }
        else {
            dispatch({
                type: UserAction.CHANGEPASS,
                data: {
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmationPassword: confirmationPassword
                },
                token: token,
                onSuccess: () => {
                    navigation.navigate("Sign in")

                }
            })
        }
    }
    return (
        <ScrollView style={styles.container}>
            <Input
                label="Mật khẩu hiện tại"
                labelStyle={styles.labelStyle}
                inputContainerStyle={styles.inputStyle}
                disabled={false}
                onChangeText={(text) => setCurrentPw(text)}
                type={"password"}
                secureTextEntry={true}
            />
            <Input
                label="Nhập mật khẩu mới"
                type={"password"}
                labelStyle={styles.labelStyle}
                inputContainerStyle={styles.inputStyle}
                onChangeText={(text) => setNewPw(text)}
                disabled={false}
                secureTextEntry={true}
            />
            <Input
                label="Xác nhận lại mật khẩu"
                labelStyle={styles.labelStyle}
                inputContainerStyle={styles.inputStyle}
                disabled={false}
                onChangeText={(text) => setConfirmPw(text)}
                type={"password"}
                secureTextEntry={true}
            />
            <Button
                onPress={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                title={"Gửi"}></Button>
        </ScrollView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignContent: "center",
        height: "100%",
        padding: 20
    }
})