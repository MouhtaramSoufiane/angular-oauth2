export interface UserProfile {
  userId: string;
  username: string;
  email: string;
  scope: string;
  accessToken: string;
  refreshToken: string;
  givenName: string;
  familyName: string;
  roles: string[];
}
