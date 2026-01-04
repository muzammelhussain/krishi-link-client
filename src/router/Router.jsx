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
import ErrorPage from "../pages/ErrorPage";
import ValueProposition from "../pages/ValueProposition";
import BlogTopics from "../pages/BlogTopics";
import ContactAndSupport from "../pages/ContactAndSupport";
import HelpAndSupport from "../pages/HelpAndSupport";
import TermsAndConditions from "../pages/TermsAndConditions";
import SendInterest from "../components/cropDetail/SendInterest";
import ReceivedInterests from "../components/cropDetail/ReceivedInterests";
import DashboardLayout from "../root/DashboardLayout";
import Projects from "../components/footer/Projects";
import Careers from "../components/footer/Careers";
import FAQ from "../components/footer/FAQ";
import Dashboard from "../root/Dashboard";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/home",
        Component: Home,
      },
      {
        path: "/allCrops",
        Component: AllCrops,
      },
      {
        path: "/about-us",
        Component: ValueProposition,
      },
      {
        path: "/blog",
        Component: BlogTopics,
      },

      {
        path: "/contact-us",
        Component: ContactAndSupport,
      },
      {
        path: "/support",
        Component: HelpAndSupport,
      },
      {
        path: "/privacy-policy",
        Component: TermsAndConditions,
      },
      {
        path: "/faq",
        Component: FAQ,
      },
      {
        path: "/careers",
        Component:Careers,
      },
      {
        path: "/projects",
        Component: Projects,
      },

      {
        path: "/allCrops/:id",
        Component: CropDetails,
        // element: (
        //   <PrivateRouter>
        //     {" "}
        //     <CropDetails></CropDetails>
        //   </PrivateRouter>
        // ),
      },
      {
        path: "/crop/:id/interest",
        element: (
          <PrivateRouter>
            <SendInterest></SendInterest>
          </PrivateRouter>
        ),
      },
      {
        path: "/crop/:id/received-interests",
        element: (
          <PrivateRouter>
            <ReceivedInterests></ReceivedInterests>
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "addCrops",
        Component: AddCrops,
      },
      {
        path: "myInterest",
        Component: MyInterest,
      },
      {
        path: "myPost",
        Component: MyPost,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "overView",
        Component: Dashboard
      }
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
  {
    path: "/*",
    Component: ErrorPage,
  },
]);
export default Router;
