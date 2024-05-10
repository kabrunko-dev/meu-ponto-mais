import { DataResponse } from './data.model';

export default interface SignInResponse {
  success: string;
  token: string;
  client_id: string;
  data: DataResponse;
}
