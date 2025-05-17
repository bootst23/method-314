import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useProfilesAPI } from "../api/profile";
import type { Profile } from "@/types/profile";

const { create, edit } = useProfilesAPI();

const useMutateProfile = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createProfile } = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ["profiles"] }, (oldData: Profile[] | undefined) =>
        oldData ? [...oldData, data] : [data],
      );
    },
  });

  const { mutateAsync: editProfile } = useMutation({
    mutationFn: edit,
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ["profiles"] }, (oldData: Profile[] | undefined) =>
        oldData ? oldData.map((s) => (s.profileID === data.profileID ? data : s)) : [data],
      );
    },
  });

  return {
    createProfile,
    editProfile,
  };
};

export { useMutateProfile };
