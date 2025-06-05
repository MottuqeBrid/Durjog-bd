import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useWishlistApi from '../../api/useWishlistApi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const WishlistPage = ({ user }) => {
  const queryClient = useQueryClient();
  const { getWishlistByEmail, removeFromWishlist } = useWishlistApi();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ['wishlist', user?.email],
    queryFn: async () => {
      const res = await getWishlistByEmail(user.email);
      return res.data;
    },
    enabled: !!user?.email
  });

  const mutation = useMutation({
    mutationFn: async (blogId) => await removeFromWishlist(user.email, blogId),
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist', user?.email]);
      toast.success('Removed from wishlist');
    },
    onError: () => toast.error('Failed to remove')
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
        <p className="text-center text-lg">You haven't wishlisted any blog yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="neumorphic p-4 rounded-xl shadow-md"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="rounded-xl mb-3 h-40 w-full object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">{blog.title}</h3>
              <p className="text-sm text-gray-600 mb-2">Category: {blog.category}</p>
              <p className="line-clamp-3 mb-3">{blog.shortDesc}</p>
              <div className="flex justify-between items-center">
                <Link to={`/blog/${blog._id}`} className="btn btn-sm btn-primary">
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

/* Neumorphism CSS (add to your global or module CSS):
.neumorphic {
  background: #e0e0e0;
  border-radius: 1rem;
  box-shadow: 8px 8px 16px #bebebe, -8px -8px 16px #ffffff;
}
*/
