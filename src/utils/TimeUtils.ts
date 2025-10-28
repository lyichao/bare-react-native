import { Booking } from '../types/BookingTypes';

// 校验 Booking 数据是否过期
export const isBookingExpired = (booking: Booking): boolean => {
    const currentTime = Date.now();
    const expiryTime = (Number(booking.expiryTime) + booking.duration) * 1000
    return currentTime > expiryTime;
};