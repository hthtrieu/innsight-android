import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, Button, Touchable } from 'react-native';
import SearchBox from '../../components/search-box/SearchBox';
import { Card, TouchableHighlight } from '@rneui/themed';
import { useLayoutEffect } from "react";

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
    return (
        <View style={{ backgroundColor: "#fff", height: "auto" }}>
            <ScrollView>
                <SearchBox navigation={navigation} />
                <View style={styles.container}>
                    <Text style={styles.title}>Điểm đến đang thịnh hành</Text>
                    <View>
                        <View style={styles.tab}>
                            <Text style={styles.tabText}>Đà Nẵng</Text>
                            <Image style={{ width: '100%', height: 150, borderRadius: 8 }} source={require('../../assets/images/DaNang.png')} />
                        </View>
                        <View style={styles.tab}>
                            <Text style={styles.tabText}>Hồ Chí Minh</Text>
                            <Image style={{ width: '100%', height: 150, borderRadius: 8 }} source={require('../../assets/images/HoChiMinh.png')} />
                        </View>
                        <View style={styles.tab}>
                            <Text style={styles.tabText}>Huế</Text>
                            <Image style={{ width: '100%', height: 150, borderRadius: 8 }} source={require('../../assets/images/Hue.png')} />
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Top các khách sạn được yêu thích nhất</Text>
                    <View style={styles.cardList}>

                        <View style={styles.card}>
                            <Card.Image
                                style={{ padding: 0, borderRadius: 8, height: 200, }}
                                source={require('../../assets/images/Hotel.png')}

                            />
                            <Text style={{ ...styles.title, textAlign: "center", fontSize: 16 }}>
                                Taian Hotel & Apartment
                            </Text>
                            <Text style={{ marginBottom: 10, textAlign: "center", fontSize: 12 }}>
                                Bãi biển Mỹ Khê, Đà Nẵng
                            </Text>
                        </View>
                        <View style={styles.card}>
                            <Card.Image
                                style={{ padding: 0, borderRadius: 8, height: 200, }}
                                source={require('../../assets/images/Hotel.png')}
                            />
                            <Text style={{ ...styles.title, textAlign: "center", fontSize: 16 }}>
                                Taian Hotel & Apartment
                            </Text>
                            <Text style={{ marginBottom: 10, textAlign: "center", fontSize: 12 }}>
                                Bãi biển Mỹ Khê, Đà Nẵng
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
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
