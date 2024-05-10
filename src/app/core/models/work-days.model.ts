import MetaResponse from './meta.model';

export interface WorkDaysResponse {
  work_days: WorkDayResponse[];
  meta: MetaResponse;
}

export interface WorkDayResponse {
  time_cards: TimeCardResponse[];
}

export interface TimeCardResponse {
  id: number;
  disabled: boolean;
  latitude: number;
  longitude: number;
  address: string;
  original_latitude: null;
  original_longitude: null;
  original_address: null;
  location_edited: boolean;
  accuracy: number;
  accuracy_method: null;
  ip: string;
  offline: boolean;
  date: string;
  time: string;
  updated_at: number;
  register_type: RegisterTypeResponse;
  source: RegisterTypeResponse;
  software_method: RegisterTypeResponse;
}

export interface RegisterTypeResponse {
  id: number;
  name: string;
}
