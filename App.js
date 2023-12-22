import React from 'react';
import { Provider } from 'react-redux';
import { Button, StyleSheet, Touchable, View, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import initStore from './src/redux/store';
import Home from './src/screens/home/Home';
import Result from './src/screens/result/Result';
import HotelDetails from './src/screens/hotel-details/HotelDetails';
import Booking from './src/screens/booking/Booking';
import CheckReservation from './src/screens/check-reservation/CheckReservation';
import Payment from './src/screens/payment/Payment';
import Invoice from './src/screens/invoice/Invoice';
import { useNavigation, useRoute } from "@react-navigation/native";
import Profile from './src/screens/profile/Profile';
import { ModalPortal } from 'react-native-modals';
import { Ionicons, Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from './src/screens/sign-in/SignIn';
import SignUp from './src/screens/sign-up/Signup';
const store = initStore();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const navigation = useNavigation();
  return (
    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", padding: 5 }}>
      <Entypo name="magnifying-glass" size={40} color="black" />
      <Pressable
        onPress={() => {
          navigation.navigate("Profile")
        }}
      >
        <Ionicons name="person-circle-outline" size={40} color="black" />
      </Pressable>
    </View>
  );
};

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation, route }) => ({
                headerRight: () => (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Profile")
                    }}
                  >
                    <Ionicons name="person-circle-outline" size={40} color="black" />
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen
              name="Result"
              component={Result}
              options={({ navigation, route }) => ({
                headerRight: () => (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Profile")
                    }}
                  >
                    <Ionicons name="person-circle-outline" size={40} color="black" />
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen
              name="Hotel"
              component={HotelDetails}
              options={({ navigation, route }) => ({
                headerRight: () => (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Profile")
                    }}
                  >
                    <Ionicons name="person-circle-outline" size={40} color="black" />
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen
              name="Booking"
              component={Booking}
              options={({ navigation, route }) => ({
                headerRight: () => (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Profile")
                    }}
                  >
                    <Ionicons name="person-circle-outline" size={40} color="black" />
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen
              name="Reservation"
              component={CheckReservation}
              options={({ navigation, route }) => ({
                headerRight: () => (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Profile")
                    }}
                  >
                    <Ionicons name="person-circle-outline" size={40} color="black" />
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={({ navigation, route }) => ({
                headerRight: () => (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Profile")
                    }}
                  >
                    <Ionicons name="person-circle-outline" size={40} color="black" />
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen
              name="Invoice"
              component={Invoice}
              options={({ navigation, route }) => ({
                headerRight: () => (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Profile")
                    }}
                  >
                    <Ionicons name="person-circle-outline" size={40} color="black" />
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={({ navigation, route }) => ({
                headerRight: () => (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Profile")
                    }}
                  >
                    <Ionicons name="person-circle-outline" size={40} color="black" />
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen
              name="Sign in"
              component={SignIn}
            />
            <Stack.Screen
              name="Sign up"
              component={SignUp}
            />

          </Stack.Navigator>
          {/* <BottomTab /> */}
          <ModalPortal />
        </NavigationContainer>
      </Provider>
    </>

  );
}

const styles = StyleSheet.create({

});
