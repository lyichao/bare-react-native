export interface OriginDestination {
    code: string;
    displayName: string;
    url: string;
}

export interface OriginDestinationPair {
    destination: OriginDestination;
    destinationCity: string;
    origin: OriginDestination;
    originCity: string;
}

export interface Segment {
  id: number;
  originAndDestinationPair: OriginDestinationPair;
}

export interface Booking {
  shipReference: string;
  shipToken: string;
  canIssueTicketChecking: boolean;
  expiryTime: string; // 秒级时间戳字符串
  duration: number;
  segments: Segment[];
}

// 缓存存储类型（附加缓存时间戳，用于双重校验）
export interface CachedBooking {
  data: Booking;
  cacheTimestamp: number; // 毫秒级时间戳
}