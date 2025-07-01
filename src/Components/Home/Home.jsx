import { useEffect, useState } from "react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AiOutlineHeart } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import Swal from "sweetalert2";
import useBlogApi from "../../api/useBlogApi";
import HomepageLoader from "../Loader/HomepageLoader";
import useWishlistApi from "../../api/useWishlistApi";
import useAuth from "../../Hooks/useAuth";
import WritersSpotlight from "../WritersSpotlight/WritersSpotlight";
import DisasterTips from "../DisasterTips/DisasterTips";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const { getRecentBlogsApi } = useBlogApi();
  const { addWishlistItemApi } = useWishlistApi();
  const { user } = useAuth();

  useEffect(() => {
    // Fetch the latest 6 blogs from your backend or Firebase
    getRecentBlogsApi()
      .then((data) => {
        setBlogs(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    Swal.fire("Subscribed!", "You've been added to our newsletter.", "success");
    e.target.reset();
  };

  const handleWishlist = async (blogId) => {
    const res = await addWishlistItemApi(blogId, user);
    if (res.status === 200) {
      Swal.fire(
        "Added to Wishlist",
        "This blog has been added to your wishlist.",
        "success"
      );
      getRecentBlogsApi()
        .then((data) => {
          setBlogs(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      Swal.fire(
        "Error",
        "There was an issue adding this blog to your wishlist.",
        "error"
      );
    }
  };

  return (
    <div className="bg-base-200 space-y-3">
      {/* Hero Section */}
      <section className="hero bg-base-200 min-h-96   shadow-inner rounded-b-3xl flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Welcome to Durjog BD 🌪️
          </h1>
          <p className="text-lg text-base-content mb-6">
            Explore stories, insights, and updates on natural disasters
            affecting Bangladesh.
          </p>
          <Link to="/all-blogs" className="btn btn-primary btn-lg neumorphism">
            Explore Blogs
          </Link>
        </motion.div>
      </section>

      {/* Recent Blogs Section */}
      <section className="py-16 px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary">Recent Blogs</h2>
          <p className="text-base-content mt-2">
            Stay updated with the latest posts
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array(6)
                .fill()
                .map((_, index) => <HomepageLoader key={index} />)
            : blogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  whileHover={{ scale: 1.02 }}
                  className="card bg-base-100 shadow-xl neumorphism"
                >
                  <figure>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover rounded-t-2xl"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-xl font-semibold">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-base-content">
                      {blog?.shortDesc?.length > 100
                        ? blog.shortDesc.slice(0, 100) + "..."
                        : blog.shortDesc}
                    </p>
                    <div className="card-actions justify-between mt-4">
                      <Link
                        to={`/blog/${blog._id}`}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        Details <BsArrowRight className="ml-1" />
                      </Link>
                      <button
                        disabled={!user || blog?.wishlist?.includes(user?.uid)}
                        onClick={() => handleWishlist(blog._id)}
                        className="btn btn-sm btn-outline btn-secondary"
                      >
                        <AiOutlineHeart className="mr-1" /> Wishlist
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link to="/all-blogs" className="btn btn-primary">
            View All Blogs
          </Link>
        </div>
      </section>

      <WritersSpotlight />
      <DisasterTips />

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-base-100 shadow-inner rounded-t-3xl">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-base-content mb-6">
            Get the latest blog updates and news directly to your inbox.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full sm:flex-1 neumorphism"
              required
            />
            <button type="submit" className="btn btn-primary neumorphism">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
