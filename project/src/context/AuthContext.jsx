import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const initialUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "admin",
    email: "admin@example.com",
    name: "Admin User"
  },
  {
    id: 2,
    username: "user",
    password: "user123",
    role: "user",
    email: "user@example.com",
    name: "Regular User",
    address: "123 User St, City",
    phone: "555-1234"
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(parsedUser.role === 'admin');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const login = async (username, password) => {
    try {
      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        setIsAuthenticated(true);
        setIsAdmin(foundUser.role === 'admin');
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const usernameExists = users.some(user => user.username === userData.username);
      const emailExists = users.some(user => user.email === userData.email);
      
      if (usernameExists) {
        return { success: false, message: 'Username already exists' };
      }
      
      if (emailExists) {
        return { success: false, message: 'Email already exists' };
      }

      const newUser = {
        ...userData,
        id: users.length + 1,
        role: 'user'
      };

      setUsers([...users, newUser]);
      setUser(newUser);
      setIsAuthenticated(true);
      setIsAdmin(false);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};