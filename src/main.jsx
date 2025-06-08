import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import { ThemeProvider } from "./context/themeContext.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <ThemeProvider>
          <Toaster />
          <PhotoProvider>
            <RouterProvider router={router} />
          </PhotoProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
// firebase deploy
// npm run build
