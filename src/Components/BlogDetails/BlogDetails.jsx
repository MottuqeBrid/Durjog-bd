import { useParams, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import { formatRelative } from "date-fns";
import { toast } from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useBlogApi from "../../api/useBlogApi";
import BlogDetailsLoader from "../Loader/BlogDetailsLoader";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();
  const { getSingleBlog, getBlogComments, PostBlogComment } = useBlogApi();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleBlog(id).then((data) => {
      setBlog(data.data);
    });

    getBlogComments(id).then((data) => {
      setComments(data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleComment = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      blogId: id,
      comment: newComment,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      userEmail: user?.email,
    };
    const res = await PostBlogComment(id, commentData);

    if (res.data.insertedId) {
      setNewComment("");
      navigate(0);
      toast.success("Comment added");
    }
  };

  if (!blog) return <BlogDetailsLoader />;

  const isOwner = user?.uid === blog?.user?.id;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-base-200 min-h-screen">
      <div className="p-6 rounded-2xl bg-base-100 neumorphic-card mb-10">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full rounded-xl h-64 object-cover mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{blog?.title}</h1>
        <p className="text-sm text-gray-500 mb-4">Category: {blog?.category}</p>
        <p className="mb-4">{blog?.shortDesc}</p>
        <p className="text-lg text-gray-700 mb-4 whitespace-pre-wrap">
          {blog?.longDesc}
        </p>
        {isOwner && (
          <Link to={`/update-blog/${blog._id}`} className="btn btn-primary">
            Update Blog
          </Link>
        )}
      </div>

      {/* Comments Section */}
      {user && (
        <div className="bg-base-100 p-6 rounded-2xl neumorphic-card">
          <h3 className="text-2xl font-semibold mb-4">Comments</h3>
          {!isOwner ? (
            <>
              <textarea
                className="textarea textarea-bordered w-full mb-2"
                rows="3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
              ></textarea>
              <button
                onClick={handleComment}
                className="btn btn-outline btn-success"
              >
                Submit Comment
              </button>
            </>
          ) : (
            <p className="text-warning">You cannot comment on your own blog.</p>
          )}

          {/* All Comments */}
          <div className="mt-6 space-y-4">
            {comments.map((cmt, index) => (
              <div
                key={index}
                className="p-4 bg-base-200 rounded-xl flex items-start gap-4"
              >
                <img
                  src={cmt.userPhoto}
                  className="w-10 h-10 rounded-full object-cover border"
                  alt={cmt.userName}
                />
                <div>
                  <p className="font-semibold">{cmt.userName}</p>
                  <p className="text-sm text-gray-600">{cmt.comment}</p>
                  <p>
                    <small>{formatRelative(cmt.createdAt, new Date())}</small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
