const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || `Request failed with status ${response.status}`);
    }

    if (!response.ok) {
      const errorMessage = data.message || data.error || data.msg || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return { success: true, data };
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Network error. Please check your connection and ensure the server is running.");
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const authAPI = {
  login: async (email, password) => {
    const result = await apiRequest("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
        const token = result.data?.token;
    const user = result.data?.user;
    
    if (token) {
      setToken(token);
      if (typeof window !== "undefined" && user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    }
    
    return { success: true, data: { token, user } };
  },

  register: async (name, email, password) => {
    const result = await apiRequest("/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    
    const token = result.data?.token;
    const user = result.data?.user;
    
    if (token) {
      setToken(token);
      if (typeof window !== "undefined" && user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    }
    
    return { success: true, data: { token, user } };
  },

  logout: () => {
    removeToken();
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
    }
  },

  getCurrentUser: () => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("currentUser");
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  isAuthenticated: () => {
    return !!getToken();
  },

  isAdmin: () => {
    const user = authAPI.getCurrentUser();
    return user?.role === "admin";
  },
};

export const bookingsAPI = {
  getAll: async () => {
    const result = await apiRequest("/bookings");
    return result.data?.data || [];
  },

  create: async (bookingData) => {
    const result = await apiRequest("/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    });
    return result.data?.data || result.data;
  },

};

export { getToken, setToken, removeToken };

