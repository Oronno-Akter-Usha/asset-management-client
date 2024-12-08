import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import JoinAsEmployee from "../pages/Register/JoinAsEmployee";
import JoinAsHrManager from "../pages/Register/JoinAsHrManager";

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
      {
        path: "/joinAsHrManager",
        element: <JoinAsHrManager />,
      },
    ],
  },
]);

export default router;
