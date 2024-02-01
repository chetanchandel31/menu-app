export const routes = {
  home: {
    path: "/home",
    name: "Home",
  },
  auth_login: {
    path: "/auth/login",
    name: "Login",
  },
  auth_signup: {
    path: "/auth/signup",
    name: "Sign Up",
  },
  heroes: {
    path: "/heroes",
    name: "Heroes",
  },
  equipments: {
    path: "/equipments",
    name: "Equipments",
  },
  settings: {
    path: "/settings",
    name: "Settings",
  },
  lexicalTest: {
    path: "/lexical-test",
    name: "Lexical Test",
  },
} as const;
