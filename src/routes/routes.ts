export const routes = {
  home: {
    path: "/",
    name: "Brand name",
  },
  menu: {
    path: "/menu",
    name: "Menu",
  },
  admin: {
    path: "/admin",
    name: "Admin",
  },
  auth_login: {
    path: "/auth/login",
    name: "Login",
    showInTopNav: false,
  },
  auth_signup: {
    path: "/auth/signup",
    name: "Sign Up",
    showInTopNav: false,
  },
} as const;
