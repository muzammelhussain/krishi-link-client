import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../root/Root";

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
        path: "/services",
        Component: Services,
      },
    ],
  },
]);
export default Router;
