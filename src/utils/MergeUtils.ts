import { Booking, Segment } from '../types/BookingTypes';

/**
 * 合并旧缓存数据与新请求数据
 * @param oldData 旧缓存数据
 * @param newData 新请求数据
 * @returns 合并后的数据
 */
export const mergeBookingData = (oldData: Booking, newData: Booking): Booking => {
    // 1. 基础字段：新数据覆盖旧数据
    const baseMerged = { ...oldData, ...newData };

    // 2. 行程数组：按id增量合并
    const oldSegmentsMap = new Map<number, Segment>(
        oldData.segments.map(segment => [segment.id, segment])
    );

    const mergedSegments: Segment[] = newData.segments.map(newSegment => {
        // 新行程存在旧缓存中 → 合并（新数据覆盖旧数据）
        if (oldSegmentsMap.has(newSegment.id)) {
            return { ...oldSegmentsMap.get(newSegment.id), ...newSegment };
        }
        // 新行程不存在旧缓存 → 直接新增
        return newSegment;
    });

    // 3. 返回合并后的数据（基础字段+合并后的行程）
    return { ...baseMerged, segments: mergedSegments };
};