import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { useProfilesAPI } from "../api/profile";

const { getAll } = useProfilesAPI();
const useQueryProfile = () => {
  function getAllProfiles() {
    const { data, isFetched } = useQuery({
      queryKey: ["profiles"],
      queryFn: () => getAll(),
      placeholderData: keepPreviousData,
    });
    return { data, isFetched };
  }

  return {
    getAllProfiles,
  };
};

export { useQueryProfile };
