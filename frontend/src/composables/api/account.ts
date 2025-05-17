import type { Account, AccountResponse, CreateAccount } from "@/types/account";
import { fetcher } from "@/utils/fetcher";

const useAccountsAPI = () => {
  async function getAll() {
    const res = await fetcher("/users");
    if (!res.ok) {
      throw new Error("Failed to fetch accounts");
    }
    return res.json<Account[]>();
  }

  async function create(accountToCreate: CreateAccount) {
    const res = await fetcher("/users", {
      method: "POST",
      json: accountToCreate,
    });
    if (!res.ok) {
      throw new Error("Failed to create account");
    }
    const resData = await res.json<AccountResponse>();
    return resData.user;
  }

  async function edit(accountToEdit: Account) {
    const res = await fetcher(`/users/${accountToEdit.id}`, {
      method: "PUT",
      json: accountToEdit,
    });
    if (!res.ok) {
      throw new Error("Failed to edit account");
    }
    const resData = await res.json<AccountResponse>();
    return resData.user;
  }

  return { getAll, create, edit };
};

export { useAccountsAPI };
