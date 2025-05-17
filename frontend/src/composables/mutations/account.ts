import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useAccountsAPI } from "../api/account";
import type { Account } from "@/types/account";

const { create, edit } = useAccountsAPI();

const useMutateAccount = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createAccount } = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ["accounts"] }, (oldData: Account[] | undefined) =>
        oldData ? [...oldData, data] : [data],
      );
    },
  });

  const { mutateAsync: editAccount } = useMutation({
    mutationFn: edit,
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ["accounts"] }, (oldData: Account[] | undefined) =>
        oldData ? oldData.map((s) => (s.id === data.id ? data : s)) : [data],
      );
    },
  });

  return {
    createAccount,
    editAccount,
  };
};

export { useMutateAccount };
