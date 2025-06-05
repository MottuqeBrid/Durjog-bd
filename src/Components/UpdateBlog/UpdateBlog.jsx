import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useBlogApi from "../../api/useBlogApi";
import { useParams } from "react-router";

const UpdateBlog = () => {
  const { id } = useParams();
  const { updateBlog, getSingleBlog } = useBlogApi();

  const [blogData, setBlogData] = useState({
    title: "",
    image: "",
    category: "",
    shortDesc: "",
    longDesc: "",
  });
  useEffect(() => {
    getSingleBlog(id).then((data) => {
      setBlogData({
        ...data?.data,
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateBlog(id, blogData);
      console.log(data);
      if (data?.data?.matchedCount) {
        Swal.fire({
          title: "Success!",
          text: "Blog updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setBlogData({
          title: "",
          image: "",
          category: "",
          shortDesc: "",
          longDesc: "",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to update blog. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating the blog. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.log(error);
    }
  };
  return (
    <motion.div
      className="min-h-screen flex justify-center items-center bg-base-200 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 p-8 rounded-2xl shadow-lg neumorphism max-w-2xl w-full space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-primary">
          Add a New Blog 📝
        </h2>

        {/* Title */}
        <div className="form-control">
          <label className="label">Blog Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter blog title"
            value={blogData.title}
            onChange={handleChange}
            className="input w-full input-bordered input-primary shadow-inner"
            required
          />
        </div>

        {/* Image URL */}
        <div className="form-control">
          <label className="label">Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="https://example.com/image.jpg"
            value={blogData.image}
            onChange={handleChange}
            className="input w-full input-bordered input-secondary shadow-inner"
            required
          />
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label">Category</label>
          <select
            name="category"
            value={blogData.category}
            onChange={handleChange}
            className="select w-full select-bordered select-accent shadow-inner"
            required
          >
            <option disabled value="">
              Select category
            </option>
            <option value="Cyclone">Cyclone</option>
            <option value="Flood">Flood</option>
            <option value="Earthquake">Earthquake</option>
            <option value="Heatwave">Heatwave</option>
            <option value="Drought">Drought</option>
          </select>
        </div>

        {/* Short Description */}
        <div className="form-control">
          <label className="label">Short Description</label>
          <textarea
            name="shortDesc"
            rows="2"
            placeholder="Enter short summary"
            value={blogData.shortDesc}
            onChange={handleChange}
            className="textarea w-full textarea-bordered shadow-inner"
            required
          ></textarea>
        </div>

        {/* Long Description */}
        <div className="form-control">
          <label className="label">Long Description</label>
          <textarea
            name="longDesc"
            rows="5"
            placeholder="Enter full blog content"
            value={blogData.longDesc}
            onChange={handleChange}
            className="textarea w-full textarea-bordered shadow-inner"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn btn-primary px-8"
          >
            Submit Blog
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default UpdateBlog;
