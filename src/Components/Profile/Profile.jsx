import { useState } from "react";
import { toast } from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";

const Profile = () => {
  const { user, profileUpdate } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await profileUpdate(name, photoURL);
      toast.success("Profile updated successfully!");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 px-4">
      <motion.div
        className="neumorphic p-8 rounded-xl w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          👤 Update Profile
        </h2>
        <form onSubmit={handleUpdate} className="p-6 neumorphism space-y-4">
          <div>
            <label className="label font-semibold">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full neumorphism"
              required
            />
          </div>
          <div>
            <label className="label font-semibold">Photo URL</label>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered w-full neumorphism"
              required
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary w-full ${loading && "loading"}`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
        {user?.photoURL && (
          <div className="text-center mt-6">
            <img
              src={user?.photoURL}
              alt="Profile"
              className=" w-20 h-20 mx-auto rounded-full border-2 border-primary"
            />
            <p className="mt-2 font-semibold">{user?.displayName}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
