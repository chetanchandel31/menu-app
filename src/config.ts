export const config = {
  authCookieDomain: import.meta.env.PROD ? location.hostname : "localhost",
  HEADER_FOOTER_MAX_WIDTH: 1000,
  HEADER_MIN_HEIGHT: 52,
} as const;

export const ACCESS_TOKEN = "_mn-access-token";
export const ACCESS_TOKEN_EXPIRES_AT = "_mn-access-token-expires-at";
export const URL_BEFORE_AUTH = "_mn-url-before-auth";

export const CATEGORIES_LS_KEY = "CATEGORIES-LS-KEY";
