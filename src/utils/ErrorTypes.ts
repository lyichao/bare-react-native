// 自定义错误类型，便于 UI 层区分处理
export enum BookingErrorType {
    NETWORK_ERROR = 'NETWORK_ERROR',
    DATA_PARSE_ERROR = 'DATA_PARSE_ERROR',
    NO_CACHED_DATA = 'NO_CACHED_DATA',
    DATA_EXPIRED = 'DATA_EXPIRED',
    STORAGE_ERROR = 'STORAGE_ERROR',
}

export class BookingError extends Error {
    type: BookingErrorType;

    constructor(type: BookingErrorType, message: string) {
        super(message);
        this.type = type;
        this.name = 'BookingError';
    }
}