import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'; 
import { useFocusEffect } from '@react-navigation/native';
import { bookingDataManager } from '../managers/BookingDataManager';
import { Booking, Segment } from '../types/BookingTypes';
import { BookingError } from '../utils/ErrorTypes';

const BookingListScreen = () => {
    const [bookings, setBookings] = useState<Booking | null>(null);

    // 请求行程数据
    const loadBookingData = useCallback(async () => {
        try {
            const data = await bookingDataManager.getBookingData();
            setBookings(data);
            console.log('Booking 数据：', JSON.stringify(data, null, 2));
        } catch (error) {
            const err = error as BookingError;
            console.log('加载失败：', err.message);
        } 
    }, []);

    // 手动刷新行程数据
    const handleRefresh = useCallback(async () => {
        try {
            const freshData = await bookingDataManager.getBookingData();
            setBookings(freshData);
            console.log('手动刷新成功，新数据：', JSON.stringify(freshData, null, 2));
        } catch (error) {
            const err = error as BookingError;
            console.log('刷新失败：', err.message);
        }
    }, []);

    // 在屏幕聚焦时调用接口请求行程数据
    useFocusEffect(
        useCallback(() => {
            loadBookingData();
        }, [loadBookingData])
    );

    const renderSegmentItem = ({ item }: { item: Segment }) => {
        const { originAndDestinationPair } = item;
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemId}>行程 {item.id}</Text>
                <Text style={styles.detailsText}>
                    出发地：{originAndDestinationPair.originCity}
                </Text>
                <Text style={styles.detailsText}>
                    目的地：{originAndDestinationPair.destinationCity}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.refreshBtn} onPress={handleRefresh}>
                <Text style={styles.refreshBtnText}>刷新数据</Text>
            </TouchableOpacity>

            {bookings ? (
                <FlatList
                    data={bookings.segments}
                    renderItem={renderSegmentItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <Text style={styles.emptyText}>暂无数据</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
        backgroundColor: '#f5f5f5',
    },
    refreshBtn: {
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    refreshBtnText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
    listContent: {
        gap: 12,
        paddingBottom: 20,
    },
    itemContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    itemId: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    routeText: {
        fontSize: 15,
        color: '#222',
        marginBottom: 4,
    },
    detailsText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    loadingText: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15,
        color: '#666',
    },
    emptyText: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15,
        color: '#999',
    },
});

export default BookingListScreen;