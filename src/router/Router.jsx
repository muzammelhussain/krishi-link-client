import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../pages/Home";
import AllCrops from "../pages/AllCrops";
import AddCrops from "../pages/AddCrops";
import MyInterest from "../pages/MyInterest";
import MyPost from "../pages/MyPost";
import Profile from "../pages/Profile";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        path: "/home",
        Component: Home,
      },
      {
        path: "/allCrops",
        Component: AllCrops,
      },
      {
        path: "/addCrops",
        element: <AddCrops></AddCrops>,
      },
      {
        path: "/myInterest",
        element: <MyInterest></MyInterest>,
      },
      {
        path: "/myPost",
        element: <MyPost></MyPost>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);
export default Router;
