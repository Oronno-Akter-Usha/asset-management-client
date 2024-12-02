import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import JoinAsEmployee from "../pages/Register/JoinAsEmployee";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/joinAsEmployee",
        element: <JoinAsEmployee />,
      },
    ],
  },
]);

export default router;
