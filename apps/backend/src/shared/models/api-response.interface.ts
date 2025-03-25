export interface ApiResponse<T = undefined> {
  message: string;
  error?: string;
  data?: T;
}
