import MetaResponse from "./meta.model";

export interface SessionResponse {
  session: {
    employee: EmployeeResponse;
  },
  meta: MetaResponse;
}

export interface EmployeeResponse {
  time_balance: number;
  login: string;
  name: string;
  picture: {
    medium_url: string;
  }
}
