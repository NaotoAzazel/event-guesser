export interface JwtPayload {
  userId: number;
  username: string;
  isAdmin: boolean;
  sub: { name: string };
  iat: number;
  exp: number;
}
