import useAxiosSecure from "./../Hooks/useAxiosSecure";

const useBlogApi = () => {
  const axiosSecure = useAxiosSecure();
  const addBlogApi = (blogData) => {
    return axiosSecure.post("/blog-post", blogData);
  };
  const getRecentBlogsApi = () => {
    return axiosSecure.get("/blog-posts?size=6");
  };
  const getAllBlogsApi = (from, to) => {
    return axiosSecure.get(`/blog-posts?size=0`);
  };
  return { addBlogApi, getRecentBlogsApi, getAllBlogsApi };
};

export default useBlogApi;
