import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import JoinAsEmployee from "../pages/Register/JoinAsEmployee";
import JoinAsHrManager from "../pages/Register/JoinAsHrManager";
import Login from "./../pages/Login/Login";
import AddEmployee from "../pages/HrManager/AddEmployee";
import MyEmployee from "../pages/HrManager/MyEmployee";
import AddAsset from "../pages/HrManager/AddAsset";

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
      {
        path: "/login",
        element: <Login />,
      },

      // HR Manager
      {
        path: "/add-employee",
        element: <AddEmployee />,
      },
      {
        path: "/my-employee",
        element: <MyEmployee />,
      },
      {
        path: "/add-asset",
        element: <AddAsset />,
      },
    ],
  },
]);

export default router;
