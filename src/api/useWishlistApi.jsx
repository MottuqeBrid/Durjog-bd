import useAxiosSecure from "../Hooks/useAxiosSecure";

const useWishlistApi = () => {
  const axiosSecure = useAxiosSecure();
  const addWishlistItemApi = (id, user) => {
    return axiosSecure.patch(`/wishlist/${id}`, user);
  };
  const getWishlistItemsApi = (userId) => {
    return axiosSecure.get(`/wishlist/${userId}`);
  };
  const removeFromWishlist = (blogId, userId) => {
    return axiosSecure.patch(`/wishlist/remove/${blogId}`, { userId });
  };
  return { addWishlistItemApi, getWishlistItemsApi, removeFromWishlist };
};

export default useWishlistApi;
