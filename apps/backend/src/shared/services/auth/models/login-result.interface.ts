export interface BackendTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResult<T> {
  user: T;
  backendTokens: BackendTokens;
}
