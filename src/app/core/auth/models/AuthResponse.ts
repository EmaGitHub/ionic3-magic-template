
export interface IAuthResponse {
    refreshToken: string;
    refreshTokenExpiration: string;
    accessToken: string;
    accessTokenExpiration: string;
    userCode?: string;
    extra?: {meetingIds : string[]};
}
