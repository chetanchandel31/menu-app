export const config = {
  authCookieDomain: import.meta.env.PROD ? location.hostname : "localhost:5173",
} as const;

export const ACCESS_TOKEN = "_ht-access-token";
export const ACCESS_TOKEN_EXPIRES_AT = "_ht-access-token-expires-at";
export const URL_BEFORE_AUTH = "_ht-url-before-auth";
