import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Fake authentication - no real backend
    // If email is hrmanager@gmail.com, set role as manager
    // Otherwise, set role as user
    let role = 'user';
    if (email === 'hrmanager@gmail.com') {
      role = 'manager';
    }
    
    // Save user info in state
    setUser({ email, role });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

