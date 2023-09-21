import React, { useState } from "react";

const AuthContext = React.createContext({
  tokenId: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const newValue = {
    tokenId: token,
    isLoggedIn: !!token,
    login: (token) => {
      setToken(token);
    },
    logout: () => {
      setToken(null);
    },
  };

  return (
    <AuthContext.Provider value={newValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
