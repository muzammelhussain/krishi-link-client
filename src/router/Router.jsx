import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../pages/Home";
import AllCrops from "../pages/AllCrops";
import AddCrops from "../pages/AddCrops";
import MyInterest from "../pages/MyInterest";
import MyPost from "../pages/MyPost";
import Profile from "../pages/Profile";
import Login from "../components/login/Login";
import Registration from "../components/registration/Registration";

import Test from "../pages/Test";
import ResetPass from "../resetPassword/resetPass";
import PrivateRouter from "./PrivateRouter";
import CropDetails from "../components/cropDetail/CropDetails";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/allCrops",
        Component: AllCrops,
      },
      {
        path: "/addCrops",
        element: (
          <PrivateRouter>
            <AddCrops></AddCrops>
          </PrivateRouter>
        ),
      },
      {
        path: "/myInterest",
        element: (
          <PrivateRouter>
            <MyInterest></MyInterest>
          </PrivateRouter>
        ),
      },
      {
        path: "/myPost",
        element: (
          <PrivateRouter>
            <MyPost></MyPost>
          </PrivateRouter>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRouter>
            <Profile></Profile>
          </PrivateRouter>
        ),
      },
      {
        path: "/allCrops/:id",
        element: (
          <PrivateRouter>
            {" "}
            <CropDetails></CropDetails>
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Registration,
  },
  {
    path: "/forget-password",
    Component: ResetPass,
  },
]);
export default Router;
