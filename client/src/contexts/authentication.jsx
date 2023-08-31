import React from "react";

const AuthContext = React.createContext();

function AuthProvider(props) {
  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
