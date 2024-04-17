import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  let navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    sessionStorage.removeItem("jwt");
    navigate("/auth/signin");
  };
}
export default Logout;
