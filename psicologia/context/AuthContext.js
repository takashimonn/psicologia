// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = () => {
    // Implementa la lógica de inicio de sesión aquí si es necesario
    setUser({ /* Datos del usuario */ });
  };

  const signOut = () => {
    // Implementa la lógica de cierre de sesión aquí si es necesario
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};