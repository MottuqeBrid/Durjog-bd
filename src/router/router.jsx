import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/Layout/RootLayout";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import AddBlog from "../Components/AddBlog/AddBlog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <h1>hellow</h1>,
      },
      {
        path: "add-blog",
        element: <AddBlog />,
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
