import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwt_decode(JSON.parse(localStorage.getItem("authToken")).access)
      : null
  );
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    let data = await response.json();

    if (response.ok) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
      navigate("/");
    } else return false;
  };

  const handleLogout = async () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const updateToken = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: authToken?.refresh }),
    });

    let data = await response.json();

    if (response.ok) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
    } else handleLogout();

    if (loading) setLoading(false);
  };

  let contextData = {
    authToken,
    user,
    handleLogin,
    handleLogout,
  };

  useEffect(() => {
    if (loading) updateToken();

    let fourMinutes = 1000 * 60 * 4;

    let refreshTokenInterval = setInterval(() => {
      if (authToken) updateToken();
    }, fourMinutes);

    return () => clearInterval(refreshTokenInterval);
  }, [authToken, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
