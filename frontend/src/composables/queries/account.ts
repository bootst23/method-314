import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { useAccountsAPI } from "@/composables/api/account";

const { getAll } = useAccountsAPI();
const useQueryAccount = () => {
  function getAllAccounts() {
    const { data, isFetched } = useQuery({
      queryKey: ["accounts"],
      queryFn: () => getAll(),
      placeholderData: keepPreviousData,
    });
    return { data, isFetched };
  }

  return {
    getAllAccounts,
  };
};

export { useQueryAccount };
