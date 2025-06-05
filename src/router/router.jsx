import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/Layout/RootLayout";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import AddBlog from "../Components/AddBlog/AddBlog";
import Home from "./../Components/Home/Home";
import AllBlogs from "../Components/AllBlogs/AllBlogs";
import BlogDetails from "../Components/BlogDetails/BlogDetails";
import UpdateBlog from "../Components/UpdateBlog/UpdateBlog";
import FeaturedBlogs from "../Components/FeaturedBlogs/FeaturedBlogs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "add-blog",
        element: <AddBlog />,
      },
      {
        path: "all-blogs",
        element: <AllBlogs />,
      },
      {
        path: "blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "update-blog/:id",
        element: <UpdateBlog />,
      },
      {
        path: "featured",
        element: <FeaturedBlogs />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
