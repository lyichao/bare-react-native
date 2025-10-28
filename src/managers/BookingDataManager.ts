import { Booking } from '../types/BookingTypes';
import { BookingService } from '../services/BookingService';
import { BookingStorage } from '../storage/BookingStorage';
import { isBookingExpired } from '../utils/TimeUtils';
import { BookingError, BookingErrorType } from '../utils/ErrorTypes';
import { mergeBookingData } from '../utils/MergeUtils';

export class BookingDataManager {
    private static instance: BookingDataManager;

    private constructor() { }

    // 对外提供单例实例
    public static getInstance(): BookingDataManager {
        if (!BookingDataManager.instance) {
            BookingDataManager.instance = new BookingDataManager();
        }
        return BookingDataManager.instance;
    }

    /**
     * 对外统一接口：获取Booking数据
     * 逻辑优先级：缓存有效→返回缓存→缓存无效/无缓存→请求新数据→更新缓存→返回新数据
     */
    public async getBookingData(): Promise<Booking> {
        try {
            // 读取缓存
            const cachedData = await BookingStorage.get();

            // 缓存存在且有效,则直接返回
            if (cachedData) {
                const { data: cachedBooking } = cachedData;
                if (!isBookingExpired(cachedBooking)) {
                    console.log('使用缓存数据（未过期）');
                    return cachedBooking;
                }
                console.log('缓存数据已过期，将请求新数据');
            }

            // 缓存无效/无缓存，请求新数据
            const newBookingData = await BookingService.fetchBookingData();

            let finalData = newBookingData;
            if (cachedData) {
                finalData = mergeBookingData(cachedData.data, newBookingData);
                console.log('新旧数据合并完成');
            }

            // 新数据有效，更新缓存
            await BookingStorage.save(finalData);
            console.log('新数据请求成功，已更新缓存');

            return newBookingData;
        } catch (error) {
            // 请求失败时，返回缓存（若存在）
            if (error instanceof BookingError) {
                const cachedData = await BookingStorage.get();
                if (cachedData) {
                    console.log('请求失败，使用过期缓存数据');
                    return cachedData.data;
                }
                // 无缓存且请求失败，抛出无缓存错误
                throw new BookingError(
                    BookingErrorType.NO_CACHED_DATA,
                    '无缓存数据且请求失败：' + error.message
                );
            }

            // 其他未知错误
            throw new BookingError(
                BookingErrorType.NETWORK_ERROR,
                '获取数据失败：' + (error as Error).message
            );
        }
    }

}

export const bookingDataManager = BookingDataManager.getInstance();