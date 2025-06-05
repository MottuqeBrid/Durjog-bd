import useAxiosSecure from "./../Hooks/useAxiosSecure";

const useBlogApi = () => {
  const axiosSecure = useAxiosSecure();
  const addBlogApi = (blogData) => {
    return axiosSecure.post("/blog-post", blogData);
  };
  const getRecentBlogsApi = () => {
    return axiosSecure.get("/blog-posts?size=6");
  };
  const getAllBlogsApi = () => {
    return axiosSecure.get(`/blog-posts`);
  };
  const getSingleBlog = (id) => {
    return axiosSecure.get(`/blog/${id}`);
  };
  const getBlogComments = (id) => {
    return axiosSecure.get(`/blog/${id}/comments`);
  };
  const PostBlogComment = (id, data) => {
    return axiosSecure.post(`/blog/${id}/comment`, data);
  };
  const updateBlog = (id, data) => {
    return axiosSecure.patch(`/blog/${id}`, data);
  };
  return {
    addBlogApi,
    getRecentBlogsApi,
    getAllBlogsApi,
    getSingleBlog,
    getBlogComments,
    PostBlogComment,
    updateBlog,
  };
};

export default useBlogApi;
