import React from "react";
import NotFound from "../assets/error-404.png";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="text-center bg-white h-svh">
      <img className="max-[500px] mx-auto my-6" src={NotFound} alt="" />
      <h1 className="text-3xl font-bold text-[#001931]">
        Oops, page not found!
      </h1>
      <p className="text-[#627382] my-4">
        The page you are looking for is not available.
      </p>
      <Link to="/">
        <button className="btn  text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2]">
          Go Back!
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
