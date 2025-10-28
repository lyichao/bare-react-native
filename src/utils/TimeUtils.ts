import { Booking } from '../types/BookingTypes';

// 校验 Booking 数据是否过期
export const isBookingExpired = (booking: Booking): boolean => {
    const currentTime = Date.now(); 
    console.log('expiryTime:', booking.expiryTime, 'duration:', booking.duration,Number(booking.expiryTime) + Number(booking.duration))
    const expiryTime = (Number(booking.expiryTime) + booking.duration) * 1000 

    console.log(`当前时间戳：${currentTime}`,typeof currentTime);
    console.log(`过期时间戳：${expiryTime}`,typeof expiryTime);
    return currentTime > expiryTime;
};