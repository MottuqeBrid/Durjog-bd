import { useEffect, useState } from "react";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useBlogApi from "../../api/useBlogApi";
import { formatRelative } from "date-fns";
import Swal from "sweetalert2";
import useWishlistApi from "../../api/useWishlistApi";
import useAuth from "../../Hooks/useAuth";
import NoBlogsFound from "../NoBlogsFound/NoBlogsFound";
import { PhotoView } from "react-photo-view";

const AllBlogs = () => {
  // const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const { getBlogBySearch } = useBlogApi();
  const { addWishlistItemApi } = useWishlistApi();
  const { user } = useAuth();

  useEffect(() => {
    getBlogBySearch().then((data) => {
      setFilteredBlogs(data.data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchBlog = async () => {
    const filter = await getBlogBySearch(search.toLowerCase(), category);
    setFilteredBlogs(filter.data);
  };
  useEffect(() => {
    searchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  const handleWishlist = async (blog) => {
    const res = await addWishlistItemApi(blog._id, user);
    if (res.status === 200) {
      Swal.fire(
        "Added to Wishlist",
        "This blog has been added to your wishlist.",
        "success"
      );
      searchBlog();
    } else {
      Swal.fire(
        "Error",
        "There was an issue adding this blog to your wishlist.",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-base-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        📰 All Blogs
      </h2>

      {/* Filter + Search */}
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <select
          className="select select-bordered bg-base-100 neumorphic-input"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Cyclone">Cyclone</option>
          <option value="Flood">Flood</option>
          <option value="Earthquake">Earthquake</option>
          <option value="Heatwave">Heatwave</option>
          <option value="Drought">Drought</option>
        </select>

        <input
          type="text"
          placeholder="Search by title"
          className="input input-bordered bg-base-100 neumorphic-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Blog Cards */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height={250} borderRadius={12} />
            ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.length > 0 &&
            filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="p-4 rounded-2xl neumorphism neumorphic-card shadow-sm bg-base-100"
              >
                <PhotoView src={blog?.image}>
                  <img
                    src={blog?.image}
                    alt={blog?.title}
                    className="rounded-xl h-40 w-full object-cover mb-3"
                  />
                </PhotoView>
                <h3 className="text-xl font-semibold">{blog?.title}</h3>
                {blog?.createdAt && (
                  <p className="text-sm text-gray-500 mb-2">
                    create on:{" "}
                    {formatRelative(new Date(blog.createdAt), new Date())}
                  </p>
                )}
                {blog?.updatedAt && (
                  <p className="text-sm text-gray-500 mb-2">
                    Last updated:{" "}
                    {formatRelative(new Date(blog.updatedAt), new Date())}
                  </p>
                )}
                <p className="text-sm text-gray-500 mb-2">{blog?.category}</p>
                <p className="text-sm mb-3">
                  {blog?.shortDesc?.length > 100
                    ? blog.shortDesc.slice(0, 100) + "..."
                    : blog.shortDesc}
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Details
                  </Link>
                  <button
                    disabled={!user || blog?.wishlist?.includes(user?.uid)}
                    onClick={() => handleWishlist(blog)}
                    className="btn btn-sm btn-outline btn-secondary "
                  >
                    Wishlist 💖
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {filteredBlogs.length === 0 && <NoBlogsFound />}
    </div>
  );
};

export default AllBlogs;
