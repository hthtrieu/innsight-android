import { StyleSheet, Button, View, Alert } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HotelAction from '../../redux/hotel/action'
const Home = () => {
    const { message } = useSelector(state => state.Hotel)
    const dispatch = useDispatch();
    const handlePress = () => {
        dispatch({
            type: HotelAction.SAMPLE_ACTION,
            onSuccess: () => {
                Alert.alert(message)
            }
        })
    }
    return (
        <View style={styles.container}>
            <Button
                title="Press me"
                onPress={handlePress}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});