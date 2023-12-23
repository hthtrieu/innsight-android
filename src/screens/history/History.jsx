import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux'
import UserAction from '../../redux/user/action';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import InvoiceBlock from '../../components/invoice-block/InvoiceBlock';
const History = () => {
    const { token, id } = useSelector(state => state.Auth)
    const { userHistoryReservations } = useSelector(state => state.User)
    console.log(userHistoryReservations)
    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            dispatch({
                type: UserAction.GET_HISTORY_RESERVATIONS,
                requestData: id,
                token: token
            })
        }
    }, [id])
    return (
        <ScrollView style={styles.bg}>
            {Array.isArray(userHistoryReservations?.reservationList) &&
                userHistoryReservations?.reservationList?.map((invoice, index) => (
                    <InvoiceBlock key={index}
                        data={invoice}
                    />
                ))
            }
        </ScrollView>
    )
}

export default History

const styles = StyleSheet.create({
    bg: {
        backgroundColor: "white",
        height: "100%"
    }
})