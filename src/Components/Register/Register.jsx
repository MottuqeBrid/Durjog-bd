import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const { signUp, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least  one lowercase letter.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least  one uppercase letter.");
      return;
    }
    if (/[0-9]/.test(password)) {
      setError("Password must contain at least  one number.");
      return;
    }

    try {
      await signUp(email, password, name, photoURL);
      form.reset();
      await Swal.fire("Success", "Account created successfully!", "success");
      navigate("/");
    } catch (err) {
      await Swal.fire("Error", err.message, "error");
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      await Swal.fire("Success", "Account created successfully!", "success");
      navigate("/");
    } catch (err) {
      await Swal.fire("Error", err.message, "error");
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 shadow-xl rounded-3xl glass border border-base-300">
        <h2 className="text-2xl font-bold text-center mb-6">📝 Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full neumorphism"
            required
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            className="input input-bordered w-full neumorphism"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full neumorphism"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full neumorphism"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="btn btn-primary w-full neumorphism">
            Create Account
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="btn w-full btn-outline neumorphism"
        >
          <FcGoogle className="text-xl mr-2" /> Sign in with Google
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
