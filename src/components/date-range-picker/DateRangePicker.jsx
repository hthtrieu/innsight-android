import React, { useState, useCallback } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';

const initialDate = moment().format('YYYY-MM-DD');

const DateRangePicker = ({ handleCancel, handleSave, onStartDay, onEndDay }) => {
    const [range, setRange] = useState({ startDay: null, endDay: null });

    const onDayPress = useCallback((day) => {
        if (!range.startDay || (range.startDay && range.endDay)) {
            // First click or reset
            setRange({ startDay: day.dateString, endDay: null });
            onStartDay(day.dateString);
            onEndDay(null);
            setupMarkedDates(day.dateString, null);
        } else {
            // Second click
            const newRange = {
                startDay: range.startDay,
                endDay: moment(day.dateString).isSameOrAfter(range.startDay)
                    ? day.dateString
                    : range.startDay,
            };

            setRange(newRange);
            setupMarkedDates(newRange.startDay, newRange.endDay);
            onStartDay(newRange.startDay);
            onEndDay(newRange.endDay);
        }
    }, [onStartDay, onEndDay, range]);

    const setupMarkedDates = useCallback((start, end) => {
        let markedDates = {};

        markedDates[start] = { selected: true, startingDay: true, color: 'blue', textColor: 'white' };

        if (end) {
            let currentDate = moment(start);
            while (currentDate.add(1, 'days').diff(end) < 0) {
                const currentDateString = currentDate.clone().format('YYYY-MM-DD');
                markedDates[currentDateString] = { selected: true, color: 'blue', textColor: 'white' };
            }

            // Mark the end day
            markedDates[end] = { selected: true, endingDay: true, color: 'blue', textColor: 'white' };
        }

        setMarked(markedDates);
    }, []);

    const [marked, setMarked] = useState({});

    return (
        <View>
            <CalendarList
                current={initialDate}
                minDate={initialDate}
                onDayPress={onDayPress}
                calendarHeight={"100%"}
                horizontal={true}
                hideArrows={false}
                pagingEnabled={true}
                markedDates={marked}
                style={{ marginLeft: -15 }}
            />
            <Button style={styles.button} title="Save" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4344E5',
        height: 40,
    },
});

export default DateRangePicker;
