import React from "react";
import useAuth from "../Hooks/useAuth";
import LoadingSkeleton from "../Components/Loader/LoadingSkeleton";
import { useNavigate } from "react-router";
import LoadingPage from "../Components/Loader/LoadingPage";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) return <LoadingPage />;
  if (!user) return navigate("/login");
  return children;
};

export default PrivateRouter;
