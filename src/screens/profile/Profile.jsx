import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import History from '../history/History';
import ChangePassword from '../change-pass-word/ChangePassword';
import { Button, Stack } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux'
import AuthAction from '../../redux/auth/action';
const Tab = createBottomTabNavigator();

const Profile = () => {
    const { userProfile, isLogin, token } = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const handleLogout = () => {
        dispatch({
            type: AuthAction.LOG_OUT,
            token: token,
            onError: (error) => {
                console.log(error)
                Alert.alert("Lỗi")
            }
        })
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                if (!isLogin) {
                    return (
                        <View style={styles.headerButtonsContainer}>
                            <Button type="outline" style={styles.headerButton} title='Sign in'
                                onPress={() => navigation.navigate("Sign in")}
                            />
                            <Button color="secondary" type="outline" style={styles.headerButton} title='Sign up'
                                onPress={() => navigation.navigate("Sign up")}
                            />
                        </View>
                    );
                } else {
                    return (
                        <View style={styles.headerButtonsContainer}>
                            <Text> {userProfile?.email}</Text>
                            <Button color="error" style={styles.headerButton} title='Log out'
                                onPress={handleLogout}
                            />
                        </View>
                    );
                }
            },
        });
    }, [navigation, isLogin]);


    return (
        <View style={styles.bg}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'History') {
                            iconName = focused ? 'file-invoice' : 'file-invoice';
                        } else if (route.name === 'Change password') {
                            iconName = focused ? 'pen' : 'pen';
                        }

                        return <FontAwesome5 name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="History" component={History} />
                <Tab.Screen name="Change password" component={ChangePassword} />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    bg: {
        backgroundColor: 'white',
        height: '100%',
    },
    headerButtonsContainer: {
        flexDirection: 'row',
        marginRight: 10,
    },
    headerButton: {
        marginHorizontal: 10,
    },
});

export default Profile;
