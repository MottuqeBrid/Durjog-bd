import useAxiosSecure from "../Hooks/useAxiosSecure";

const useWishlistApi = () => {
  const axiosSecure = useAxiosSecure();
  const addWishlistItemApi = (id, user) => {
    console.log(id, user);
    return axiosSecure.patch(`/wishlist/${id}`, user);
  };
  const getWishlistItemsApi = (userId) => {
    return axiosSecure.get(`/wishlist/${userId}`);
  };
  return { addWishlistItemApi, getWishlistItemsApi };
};

export default useWishlistApi;
