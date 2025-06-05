import { useEffect, useState } from "react";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useBlogApi from "../../api/useBlogApi";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const { getAllBlogsApi } = useBlogApi();

  useEffect(() => {
    getAllBlogsApi(0, 12).then((data) => {
      console.log(data);
      setBlogs(data.data);
      setFilteredBlogs(data.data);
      setLoading(false);
    });
  }, [getAllBlogsApi]);

  useEffect(() => {
    const filter = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || blog.category === category)
    );
    setFilteredBlogs(filter);
  }, [search, category, blogs]);

  const handleWishlist = (blog) => {
    fetch(`https://your-server-url.com/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Added to wishlist");
      });
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
          <option value="Tech">Tech</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Finance">Finance</option>
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
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 rounded-2xl neumorphic-card shadow-sm bg-base-100"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="rounded-xl h-40 w-full object-cover mb-3"
              />
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{blog.category}</p>
              <p className="text-sm mb-3">{blog?.shortDesc?.slice(0, 80)}...</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/blog/${blog._id}`}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleWishlist(blog)}
                  className="btn btn-sm btn-success"
                >
                  Wishlist 💖
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
