import React from "react";
import useAxiosSecure from "./../Hooks/useAxiosSecure";

const useBlogApi = () => {
  const axiosSecure = useAxiosSecure();
  const addBlogApi = (blogData) => {
    return axiosSecure.post("/blogs", blogData);
  };
  return { addBlogApi };
};

export default useBlogApi;
