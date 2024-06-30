export interface Auth {
  clientId: string;
  uid: string;
  token: string;
}

export interface Tracker {
  worked: number;
  left: number;
  out: number;
}

export interface TimeCard {
  time: string;
  type: 'in' | 'out';
  fake?: boolean;
}
