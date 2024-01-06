import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from '@rneui/themed';
import { useDispatch } from 'react-redux'
import AuthAction from '../../redux/auth/action';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();
    const handleSignUp = () => {
        dispatch({
            type: AuthAction.SIGN_UP,
            data: {
                email: email,
                password: password
            },
            onSuccess: () => {
                navigation.navigate("Sign in")
            },
            onError: () => {
                Alert.alert("Xảy ra lỗi")
            },
        })
    }
    return (
        <View style={styles.container}>
            <Input
                label="Email"
                labelStyle={styles.labelStyle}
                inputContainerStyle={styles.inputStyle}
                disabled={false}
                onChangeText={(text) => setEmail(text)}
                type="text"
            />
            <Input
                label="Password"
                type={"password"}
                labelStyle={styles.labelStyle}
                inputContainerStyle={styles.inputStyle}
                onChangeText={(text) => setpassword(text)}
                disabled={false}
                secureTextEntry={true}
            />
            <Button
                onPress={(e) => {
                    e.preventDefault();
                    handleSignUp();
                }}
                title={"Đăng kí"}></Button>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
        padding: 20
    }

})