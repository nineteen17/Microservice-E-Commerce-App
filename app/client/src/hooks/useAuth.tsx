import React from "react";
const AuthContext = React.createContext({
    isAuthenticated: false,
    user: null,
  });
  
  const useAuth = () => {
    const { isAuthenticated, user } = React.useContext(AuthContext);
  
    return { isAuthenticated, user };
  };
  
  export default useAuth;
  