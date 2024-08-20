// src/services/auth.js

// Mock functions for authentication
// In a real application, these would interact with your backend

export const isAuthenticated = () => {
  // Check if user is authenticated
  return !!localStorage.getItem('token');
};

export const login = (username, password) => {
  // Simulate a login API call
  return new Promise((resolve, reject) => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('token', 'dummy-token');
      resolve(true);
    } else {
      reject('Invalid credentials');
    }
  });
};

export const logout = () => {
  // Remove the token from local storage
  localStorage.removeItem('token');
};

export const register = (username, password) => {
  // Simulate a register API call
  return new Promise((resolve, reject) => {
    // In a real application, you would send a request to your backend here
    if (username && password) {
      resolve(true);
    } else {
      reject('Registration failed');
    }
  });
};
