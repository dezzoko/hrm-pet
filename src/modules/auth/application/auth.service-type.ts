export interface GetUserJwtTokens {
  userId: number;
  roles: string[];
}

export interface SetRefreshTokenParams {
  userId: number;
  roles: [];
}
