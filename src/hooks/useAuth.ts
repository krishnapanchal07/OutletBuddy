import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDemoSession, setDemoSession } from "../utils/session";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(getDemoSession);
  const navigate = useNavigate();

  const login = () => {
    setDemoSession(true);
    setIsLoggedIn(true);
    navigate("/", { replace: true });
  };

  const logout = () => {
    setDemoSession(false);
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  };

  return { isLoggedIn, login, logout };
};
