import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import JoinAsEmployee from "../pages/Register/JoinAsEmployee";
import JoinAsHrManager from "../pages/Register/JoinAsHrManager";
import Login from "./../pages/Login/Login";
import AddEmployee from "../pages/HrManager/AddEmployee";
import MyEmployee from "../pages/HrManager/MyEmployee";
import AddAsset from "../pages/HrManager/AddAsset";
import AssetList from "../pages/HrManager/AssetList";
import MyTeam from "../pages/Employee/MyTeam";
import RequestAsset from "../pages/Employee/RequestAsset";

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
      {
        path: "/asset-list",
        element: <AssetList />,
      },

      // Employee
      {
        path: "/my-team",
        element: <MyTeam />,
      },
      {
        path: "/request-asset",
        element: <RequestAsset />,
      },
    ],
  },
]);

export default router;
