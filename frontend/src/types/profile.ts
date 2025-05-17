export interface Profile extends CreateProfile {
  profileID: number;
}

export interface CreateProfile {
  profile: string;
  suspended: number;
}

export interface ProfileResponse {
  profile: Profile;
}
