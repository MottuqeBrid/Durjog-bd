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
import WishlistPage from "../Components/WishlistPage/WishlistPage";
import PrivateRouter from "./PrivateRouter";
import NotFound from "./../Components/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "add-blog",
        element: (
          <PrivateRouter>
            <AddBlog />
          </PrivateRouter>
        ),
      },
      {
        path: "all-blogs",
        element: <AllBlogs />,
      },
      {
        path: "wishlist",
        element: (
          <PrivateRouter>
            <WishlistPage />
          </PrivateRouter>
        ),
      },
      {
        path: "blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "update-blog/:id",
        element: (
          <PrivateRouter>
            <UpdateBlog />
          </PrivateRouter>
        ),
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
