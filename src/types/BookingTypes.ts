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
  expiryTime: string;
  duration: number;
  segments: Segment[];
}

// 缓存存储类型
export interface CachedBooking {
  data: Booking;
  cacheTimestamp: number; 
}