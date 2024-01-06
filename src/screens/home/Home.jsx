import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, Touchable, Pressable, Button, TouchableOpacity } from 'react-native';
import SearchBox from '../../components/search-box/SearchBox';
import { Card, TouchableHighlight } from '@rneui/themed';
import { useLayoutEffect } from "react";
import { useDispatch } from 'react-redux';
import HotelAction from '../../redux/hotel/action';
import { Alert } from 'react-native';
import moment from 'moment';
import { setSearchParams } from '../../redux/hotel/slice'
const Home = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Innsight",
            headerTintColor: '#3A1568',
            headerStyle: {
                height: 110,
                borderBottomColor: "transparent",
                backgroundColor: '#D5F0F9',
                shadowColor: "transparent",
            },
            headerTitleAlign: 'center',
            // headerRight: () => (
            //     <Text>
            //         ABC
            //     </Text>
            // ),
        });
    }, [navigation]);
    const dispatch = useDispatch();
    const handleClick = (text) => {
        console.log(text)
        dispatch(setSearchParams({
            province: text,
            adults: 2,
            children: 0,
            rooms: 1,
            startDay: moment().format('YYYY-MM-DD'),
            endDay: moment().add(1, 'days').format('YYYY-MM-DD'),
        }));

        navigation.navigate('Result')
        // dispatch({
        //     type: HotelAction.SEARCH_HOTELS_START,
        //     province: text,
        //     adults: 2,
        //     children: 0,
        //     rooms: 1,
        //     startDay: moment().format('YYYY-MM-DD'),
        //     endDay: moment().add(1, 'days').format('YYYY-MM-DD'),
        //     onSuccess: () => {
        //         navigation.navigate('Result')
        //     },
        //     onError: () => {
        //         Alert.alert("Không tìm thấy")
        //     }
        // })
    }
    return (
        <View style={{ backgroundColor: "#fff", height: "auto" }}>
            <ScrollView>
                <SearchBox navigation={navigation} />
                <View style={styles.container}>
                    <Text style={styles.title}>Điểm đến đang thịnh hành</Text>
                    <Pressable
                        style={{ ...styles.tab }}
                        onPress={() => handleClick("Thành phố Đà Nẵng")}
                    >
                        <Text style={styles.tabText}>Đà Nẵng</Text>
                        <Image
                            style={{ width: '100%', height: 150, borderRadius: 8 }} source={require('../../assets/images/DaNang.jpeg')} />
                    </Pressable>

                    <Pressable
                        style={styles.tab}
                        onPress={() => handleClick("Thành phố Hồ Chí Minh")}
                    >
                        <Text style={styles.tabText}>Hồ Chí Minh</Text>
                        <Image style={{ width: '100%', height: 150, borderRadius: 8 }} source={require('../../assets/images/HoChiMinh.jpeg')} />
                    </Pressable>

                    <Pressable
                        style={styles.tab}
                        onPress={() => handleClick("Tỉnh Thừa Thiên Huế")}
                    >
                        <Text style={styles.tabText}>Huế</Text>
                        <Image style={{ width: '100%', height: 150, borderRadius: 8 }} source={require('../../assets/images/Hue.jpeg')} />
                    </Pressable>

                </View>
            </ScrollView >

        </View >
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        padding: 30
    },
    tab: {
        position: 'relative',
        marginBottom: 10,
    },
    tabText: {
        position: "absolute",
        top: "10%",
        left: "2%",
        zIndex: 1,
        color: "#fff",
        fontSize: 16,
        fontWeight: '600',
    },
    title: {
        color: '#000',
        fontSize: 20,
        fontWeight: '700',
    },
    cardList: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 10,
    },
    card: {
        width: "50%"
    },

});
