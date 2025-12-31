
export const logout = async () => {
  const res = await fetch(`/api/auth/logout`, { method: "POST" });
  if (res.ok) {
    return true;
  }
  return false;
};
