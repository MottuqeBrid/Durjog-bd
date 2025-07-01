import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import useWishlistApi from "../../api/useWishlistApi";
import useAuth from "../../Hooks/useAuth";

const WishlistPage = () => {
  const queryClient = useQueryClient();
  const { removeFromWishlist, getWishlistItemsApi } = useWishlistApi();
  const { user } = useAuth();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await getWishlistItemsApi(user.uid);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const mutation = useMutation({
    mutationFn: async (blogId) => await removeFromWishlist(blogId, user?.uid),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist", user?.email]);
      toast.success("Removed from wishlist");
    },
    onError: () => toast.error("Failed to remove"),
  });

  return (
    <div className="min-h-screen px-4 py-8 bg-base-200 text-base-content">
      <h2 className="text-3xl font-bold text-center mb-6">❤️ Your Wishlist</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height={250} className="rounded-lg" />
          ))}
        </div>
      ) : wishlist.length === 0 ? (
        <p className="text-center text-lg">
          You haven't wishlisted any blog yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((blog) => (
            <motion.div
              key={blog?._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="neumorphic p-4 rounded-xl flex flex-col   shadow-md neumorphism neumorphic-card  bg-base-100"
            >
              <img
                src={blog?.image}
                alt={blog?.title}
                className="rounded-xl mb-3 h-40 w-full object-cover"
              />

              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{blog?.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Category: {blog?.category}
                </p>

                <p className="line-clamp-3 mb-3">{blog?.shortDesc}</p>
              </div>
              <div className="flex justify-between items-center">
                <Link
                  to={`/blog/${blog._id}`}
                  className="btn btn-sm btn-primary"
                >
                  Details
                </Link>
                <button
                  onClick={() => mutation.mutate(blog._id)}
                  className="btn btn-sm btn-error"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
