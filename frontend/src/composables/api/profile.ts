import type { CreateProfile, Profile, ProfileResponse } from "@/types/profile";
import { fetcher } from "@/utils/fetcher";

const useProfilesAPI = () => {
  async function getAll() {
    const res = await fetcher("/profiles");
    if (!res.ok) {
      throw new Error("Failed to fetch profiles");
    }
    return res.json<Profile[]>();
  }

  async function create(profile: CreateProfile) {
    const res = await fetcher("/profiles", {
      method: "POST",
      json: { ...profile },
    });
    if (!res.ok) {
      throw new Error("Failed to create profile");
    }
    const resData = await res.json<ProfileResponse>();
    return resData.profile;
  }

  async function edit(profile: Profile) {
    const res = await fetcher(`/profiles/${profile.profileID}`, {
      method: "PUT",
      json: { ...profile },
    });
    if (!res.ok) {
      throw new Error("Failed to edit profile");
    }
    const resData = await res.json<ProfileResponse>();
    return resData.profile;
  }

  return { getAll, create, edit };
};

export { useProfilesAPI };
