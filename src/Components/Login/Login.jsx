import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login, googleSignIn, user } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login(email, password);
      form.reset();
      Swal.fire(
        `Welcome Back! ${user?.displayName}`,
        "You are now logged in.",
        "success"
      );
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      await Swal.fire(
        `Welcome Back! ${user?.displayName}`,
        "You are now logged in.",
        "success"
      );
      navigate("/");
    } catch (err) {
      await Swal.fire("Error", err.message, "error");
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 shadow-xl rounded-3xl glass border border-base-300">
        <h2 className="text-2xl font-bold text-center mb-6">🔐 Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full neumorphism"
            required
          />
          <div className="join relative w-full ">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full join-item neumorphism"
              required
            />
            <button
              type="button"
              className="absolute w-8 top-1/2 right-4 z-10 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="btn btn-primary w-full neumorphism">
            Login
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
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
