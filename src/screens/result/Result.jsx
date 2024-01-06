import {
    StyleSheet,
    Text,
    View, Image, ActivityIndicator, FlatList, TouchableOpacity
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from '@rneui/base';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import HotelAction from '../../redux/hotel/action';
const Result = ({ navigation }) => {
    const { result, searchParams } = useSelector(state => state.Hotel)
    const dispatch = useDispatch();
    const [hotels, setHotels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState({});
    const [province, setProvince] = useState("")
    const getHotels = () => {
        setIsLoading(true);
        console.log(searchParams);
        dispatch({
            type: HotelAction.SEARCH_HOTELS_START,
            province: searchParams?.province,
            checkinDay: searchParams?.checkinDay || searchParams?.startDay,
            checkoutDay: searchParams?.checkoutDay || searchParams?.endDay,
            count: searchParams?.count || searchParams?.rooms,
            adultCount: searchParams?.adultCount || searchParams?.adults,
            childrenCount: searchParams?.childrenCount || searchParams?.children,
            rate: searchParams?.rate,
            fromPrice: searchParams?.fromPrice,
            toPrice: searchParams?.toPrice,
            review: searchParams?.review,
            pageIndex: !currentPage ? 1 : currentPage,
            pageSize: 6,
            onSuccess: () => {
                // setHotels([...hotels, ...result?.hotels])
                setCurrentPage(currentPage + 1);
            },
            onError: () => {
                Alert.alert("Không tìm thấy");
            },
        });
    };



    useEffect(() => {
        if (result === undefined) {

        }
        else if (!Object.keys(result).length) {
            dispatch({
                type: HotelAction.SEARCH_HOTELS_START,
                province: searchParams?.province,
                checkinDay: searchParams?.checkinDay || searchParams?.startDay,
                checkoutDay: searchParams?.checkoutDay || search?.endDay,
                count: searchParams?.count || searchParams?.rooms,
                adultCount: searchParams?.adultCount || searchParams?.adults,
                childrenCount: search?.childrenCount || searchParams?.children,
                rate: searchParams?.rate,
                fromPrice: searchParams?.fromPrice,
                toPrice: searchParams?.toPrice,
                review: searchParams?.review,
                pageIndex: 1,
                pageSize: 6,
                onSuccess: () => {
                    setIsLoading(true)
                },
                onError: () => {
                    Alert.alert("Không tìm thấy")
                }
            })
        }
        if (result && Array.isArray(result?.hotels)) {
            setHotels([...hotels, ...result?.hotels])
        }

    }, [result, searchParams])
    useEffect(() => {
        setSearch(searchParams)
        setProvince(searchParams?.province || "")
        setHotels([]); // Resetting the hotels state
        getHotels()
    }, [searchParams])
    const renderLoader = () => {
        return (
            <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={getHotels}
                    //On Click of button load more data
                    style={styles.loadMoreBtn}>
                    <Text style={styles.btnText}>Load More</Text>
                    {isLoading ? (
                        <ActivityIndicator
                            color="white"
                            style={{ marginLeft: 8 }} />
                    ) : null}
                </TouchableOpacity>
            </View>
        );
    };

    const handleSelectHotel = (id) => {
        navigation.navigate('Hotel', { hotelId: id })
    }
    const renderItem = ({ item }) => {
        return (<View style={styles.resultBlock}>
            <View style={{ ...styles.imageWrapper, backgroundColor: 'gray', minHeight: 300 }}>
                <Image
                    source={{ uri: item?.hotelImgPath }}
                    style={{
                        ...styles.image, resizeMode: 'cover'
                    }}
                />

            </View>


            <View style={styles.content}>
                <Text style={{ color: '#0735D6', fontSize: 20, fontWeight: '700' }}>{item?.hotelName}</Text>
                <View style={styles.flexCenter}>
                    <Icon name="location-pin" size={20} color="black" />
                    <Text>{item?.address}</Text>
                </View>
                {item?.amenities?.slice(0, 5).map((amenty, idx) => (
                    <View style={styles.flexCenter} key={idx}>
                        <Icon name='check' size={20} color="black" />
                        <Text>{amenty}</Text>
                    </View>
                ))}

                <Text style={styles.priceColor}>
                    {item?.minPrice.toLocaleString('vi-VN')} VND
                </Text>
                <Text style={{ color: 'black', fontSize: 14, fontWeight: 700 }}>
                    Phòng/đêm
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%' }}>
                    <Text style={{ color: 'red' }}>{item?.rating}/10</Text>
                    <Text>{`  ${item?.reviews} đánh giá`}</Text>

                </View>
                <Button
                    buttonStyle={
                        {
                            backgroundColor: "#E67E03"
                        }
                    }
                    onPress={(event) => { event.preventDefault(); handleSelectHotel(item?.id) }}
                >
                    Chọn phòng
                </Button>
            </View>

        </View>)
    }
    return (
        <View style={{ backgroundColor: "#fff", padding: 10 }}>
            <Text>{result?.totalItems} Chỗ nghỉ</Text>
            <View style={styles.resultList}>
                <FlatList
                    data={hotels}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={renderLoader}
                // onEndReached={loadMoreItem}
                // onEndReachedThreshold={0}
                />
            </View>
        </View>
    )
}

export default Result

const styles = StyleSheet.create({
    resultList: {
        marginTop: 10,
    },
    resultBlock: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
        marginBottom: 20,

        // alignItems: "center"
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageWrapper: {
        width: '40%',
        height: 300
    },
    content: {
        width: '60%',
        paddingLeft: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    flexCenter: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: "wrap",
        alignItems: "center",
        // justifyContent: 'flex-rt'
        // justifyContent: "space-between"
    },
    priceColor: {
        color: "#E67E03",
        fontSize: 24,
        fontWeight: "700",
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
})