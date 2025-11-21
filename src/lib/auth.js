
export const authService = {
  loginUser: (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify({ ...user, role: "user" }));
      return { success: true, user };
    }
    return { success: false, error: "Invalid email or password" };
  },

  registerUser: (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already registered" };
    }
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ ...newUser, role: "user" }));
    return { success: true, user: newUser };
  },

  loginAdmin: (email, password) => {
    const adminCredentials = {
      email: "admin@paradiseretreat.com",
      password: "admin123",
    };

    if (email === adminCredentials.email && password === adminCredentials.password) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: "admin-1",
          name: "Admin",
          email: adminCredentials.email,
          role: "admin",
        })
      );
      return { success: true };
    }
    return { success: false, error: "Invalid admin credentials" };
  },

  logout: () => {
    localStorage.removeItem("currentUser");
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("currentUser");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("currentUser");
  },

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === "admin";
  },
};

