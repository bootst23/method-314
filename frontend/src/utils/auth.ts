import { useStorage } from "@vueuse/core";

export function logout() {
  const role = useStorage("role", "");
  const userId = useStorage("userId", "");
  const username = useStorage("username", "");
  role.value = null;
  userId.value = null;
  username.value = null;
}
