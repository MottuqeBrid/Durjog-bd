import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/Layout/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <h1>hellow</h1>,
      },
    ],
  },
]);
