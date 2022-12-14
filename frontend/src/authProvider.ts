import { AuthProvider } from "@pankod/refine-core";
import nookies from "nookies";

const mockUsers = [
  {
    username: "admin",
    email: "admin@refine.dev",
    roles: ["admin"],
  },
  {
    username: "editor",
    email: "editor@refine.dev",
    roles: ["editor"],
  },
];

export const authProvider: AuthProvider = {
  login: ({ email, username, password, remember }) => {
    if (email === "admin@admin.com") {
      localStorage.setItem("role", "admin");
    } else if (email === "manager@manager.com") {
      localStorage.setItem("role", "manager");
    } else if (email === "driver@driver.com") {
      localStorage.setItem("role", "driver");
    } else {
      throw new Error("Invalid email or password");
    }
    const user = mockUsers[0];

    if (user) {
      nookies.set(null, "auth", JSON.stringify(user), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      return Promise.resolve();
    }

    return Promise.reject();
  },
  logout: () => {
    nookies.destroy(null, "auth");
    localStorage.removeItem("role");
    return Promise.resolve();
  },
  checkError: (error) => {
    if (error && error.statusCode === 401) {
      return Promise.reject();
    }

    return Promise.resolve();
  },
  checkAuth: (ctx) => {
    const cookies = nookies.get(ctx);
    return cookies["auth"] ? Promise.resolve() : Promise.reject();
  },
  getPermissions: () => {
    const auth = nookies.get()["auth"];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return Promise.resolve(parsedUser.roles);
    }
    return Promise.reject();
  },
  getUserIdentity: () => {
    const auth = nookies.get()["auth"];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return Promise.resolve(parsedUser.username);
    }
    return Promise.reject();
  },
};
