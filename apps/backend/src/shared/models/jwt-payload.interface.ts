export interface JwtPayload {
  username: string;
  sub: { name: string };
  iat: number;
  exp: number;
}
