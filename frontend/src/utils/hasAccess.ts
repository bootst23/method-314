export function hasAccess(role: string) {
  return localStorage.getItem("role") === role;
}
