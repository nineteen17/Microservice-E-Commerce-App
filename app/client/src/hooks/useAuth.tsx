import React from "react";
const AuthContext = React.createContext({
    isAuthenticated: true, // Default to not authenticated
    user: null, // No user by default
  });
  
  const useAuth = () => {
    const { isAuthenticated, user } = React.useContext(AuthContext);
  
    return { isAuthenticated, user };
  };
  
  export default useAuth;
  
