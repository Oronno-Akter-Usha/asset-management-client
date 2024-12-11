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
import MyRequestedAssets from "../pages/Employee/MyRequestedAssets";
import PrivateRoute from "./PrivateRoute";
import RequestAsset from "../pages/Employee/RequestAsset";
import HrManagerRoute from "./HrManagerRoute";

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
        element: (
          <PrivateRoute>
            <HrManagerRoute>
              <AddEmployee />
            </HrManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-employee",
        element: (
          <PrivateRoute>
            <HrManagerRoute>
              <MyEmployee />
            </HrManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-asset",
        element: (
          <PrivateRoute>
            <HrManagerRoute>
              <AddAsset />
            </HrManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/asset-list",
        element: (
          <PrivateRoute>
            <HrManagerRoute>
              {" "}
              <AssetList />
            </HrManagerRoute>
          </PrivateRoute>
        ),
      },

      // Employee
      {
        path: "/my-team",
        element: (
          <PrivateRoute>
            <MyTeam />
          </PrivateRoute>
        ),
      },
      {
        path: "/request-asset",
        element: (
          <PrivateRoute>
            <RequestAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-requested-assets",
        element: (
          <PrivateRoute>
            <MyRequestedAssets />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
