import { use } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const authUser = use(AuthContext);
  return authUser;
};

export default useAuth;
