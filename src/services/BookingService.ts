import { Booking, Segment } from '../types/BookingTypes';
import { BookingError, BookingErrorType } from '../utils/ErrorTypes';

// Mock数据
const BASE_MOCK_BOOKING: Booking = {
    shipReference: 'ABCDEF',
    shipToken: 'AAAABBBCCCCDDD',
    canIssueTicketChecking: false,
    expiryTime: '1761644527',
    duration: 5,
    segments: [
        {
            id: 1,
            originAndDestinationPair: {
                destination: { code: 'gd', displayName: 'Guangdong', url: 'www.guangdong.com' },
                destinationCity: 'Guangzhou',
                origin: { code: 'hb', displayName: 'Hebei', url: 'www.bebei.com' },
                originCity: 'Shijiazhuang',
            },
        },
        {
            id: 2,
            originAndDestinationPair: {
                destination: { code: 'sc', displayName: 'Sichuan', url: 'www.sichuan.com' },
                destinationCity: 'Chengdu',
                origin: { code: 'jx', displayName: 'Jiangxi', url: 'www.jiangxi.com' },
                originCity: 'Nanchang',
            },
        },
        {
            id: 3,
            originAndDestinationPair: {
                destination: { code: 'sc', displayName: 'Sichuan', url: 'www.sichuan.com' },
                destinationCity: 'Chengdu',
                origin: { code: 'jx', displayName: 'Jiangxi', url: 'www.jiangxi.com' },
                originCity: 'Nanchang',
            },
        },


    ],
};

// 动态Mock数据
const generateDynamicMockData = (): Booking => {
    const newData = JSON.parse(JSON.stringify(BASE_MOCK_BOOKING)) as Booking;

    // 设置新的expiryTime, 用于判断数据时效性
    newData.expiryTime = Date.now().toString().slice(0, -3);

    const cityArr = ['Beijing', 'Shanghai', 'Shenzhen', 'Chengdu', 'Hangzhou', 'Wuhan', 'Nanjing'];
    newData.segments.forEach((segment) => {
        const originCityIndex = Math.floor(Math.random() * cityArr.length);
        let destinationCityIndex = Math.floor(Math.random() * cityArr.length);
        // 保证出发地和目的地不相同
        while (destinationCityIndex === originCityIndex) {
            destinationCityIndex = Math.floor(Math.random() * cityArr.length);
        }
        segment.originAndDestinationPair.originCity = cityArr[originCityIndex];
        segment.originAndDestinationPair.destinationCity = cityArr[destinationCityIndex];
    });

    return newData;
};

export const BookingService = {
    // Mock网络请求
    fetchBookingData: async (): Promise<Booking> => {
        return new Promise((resolve, reject) => {
            // 模拟网络延迟500ms
            setTimeout(() => {
                // 5%概率模拟请求失败
                const isError = Math.random() < 0.05;
                if (isError) {
                    reject(
                        new BookingError(
                            BookingErrorType.NETWORK_ERROR,
                            '网络请求失败，请重试'
                        )
                    );
                    return;
                }

                // 5%概率模拟数据解析失败
                const isParseError = Math.random() < 0.05;
                if (isParseError) {
                    reject(
                        new BookingError(
                            BookingErrorType.DATA_PARSE_ERROR,
                            '数据解析异常'
                        )
                    );
                    return;
                }
                const dynamicData = generateDynamicMockData();
                resolve(dynamicData);
            }, 500);
        });
    },
};