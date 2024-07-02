import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userPassword as getUserPassword } from "../services/storage";

function ProtectApp({ children }) {
  const navigate = useNavigate();

  const password = getUserPassword();

  useEffect(() => {
    if (!password) navigate("/login");
  }, [navigate, password]);
  if (password) return children;
}

export default ProtectApp;
