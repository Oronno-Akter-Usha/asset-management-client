import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <div className="max-w-screen-2xl h-screen mx-auto bg-[#f5f5f5]">
        <RouterProvider router={router} />
      </div>
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);
