import AsyncStorage from '@react-native-async-storage/async-storage';
import { CachedBooking, Booking } from '../types/BookingTypes';
import { BookingError, BookingErrorType } from '../utils/ErrorTypes';

const BOOKING_CACHE_KEY = 'BOOKING_CACHE';

export const BookingStorage = {
    // 保存到缓存
    save: async (booking: Booking): Promise<void> => {
        try {
            const cachedData: CachedBooking = {
                data: booking,
                cacheTimestamp: Date.now(),
            };
            await AsyncStorage.setItem(BOOKING_CACHE_KEY, JSON.stringify(cachedData));
        } catch (error) {
            throw new BookingError(
                BookingErrorType.STORAGE_ERROR,
                '缓存保存失败：' + (error as Error).message
            );
        }
    },

    // 从缓存读取
    get: async (): Promise<CachedBooking | null> => {
        try {
            const cachedStr = await AsyncStorage.getItem(BOOKING_CACHE_KEY);
            if (!cachedStr) return null;
            return JSON.parse(cachedStr) as CachedBooking;
        } catch (error) {
            throw new BookingError(
                BookingErrorType.STORAGE_ERROR,
                '缓存读取失败：' + (error as Error).message
            );
        }
    },

    // 清除缓存
    clear: async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem(BOOKING_CACHE_KEY);
        } catch (error) {
            throw new BookingError(
                BookingErrorType.STORAGE_ERROR,
                '缓存清除失败：' + (error as Error).message
            );
        }
    },
};