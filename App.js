import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
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
const store = initStore();
const Stack = createNativeStackNavigator();
import { ModalPortal } from 'react-native-modals';
export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'Innsight',
                headerStyle: {
                  backgroundColor: '#D5F0F9',
                },
                headerTintColor: '#3A1568',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center', // Thêm dòng này để căn giữa tiêu đề
              }}
            />
            <Stack.Screen
              name="Result"
              component={Result}
            />
            <Stack.Screen
              name="Hotel"
              component={HotelDetails}
            />
            <Stack.Screen
              name="Booking"
              component={Booking}
            />
            <Stack.Screen
              name="Reservation"
              component={CheckReservation}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
            />
            <Stack.Screen
              name="Invoice"
              component={Invoice}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      <ModalPortal />
    </>

  );
}

const styles = StyleSheet.create({

});
