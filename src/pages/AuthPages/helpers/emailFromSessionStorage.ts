const AUTH_EMAIL = "AUTH_EMAIL";

export const getAuthEmailSessionStorage = (): string =>
  sessionStorage.getItem(AUTH_EMAIL) || "";

export const setAuthEmailToSessionStorage = (email: string) =>
  sessionStorage.setItem(AUTH_EMAIL, email);
