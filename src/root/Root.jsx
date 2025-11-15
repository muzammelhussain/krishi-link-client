import React from "react";
import Header from "../components/navbar/Header";
import { Outlet } from "react-router";
import Footer from "../components/footer/Footer";

const Root = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
