import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogle, FaGithub, FaFacebookF } from "react-icons/fa"; // Importing all social icons

const SocialAuthSection = ({ handleGoogleSignUp, handleGithubLogin, handleFacebookLogin }) => {
  const { loading } = useContext(AuthContext);
  
  const buttonClasses = "w-full btn border-none text-white transition duration-200 shadow-md flex items-center justify-center font-semibold text-base";
  const disabledClasses = "opacity-70 cursor-not-allowed";

  return (
    <div className="w-full">
      <div className="divider text-gray-400 font-medium my-4">OR REGISTER WITH</div>
      
      {/* Google Sign-In Button */}
      <button
        onClick={handleGoogleSignUp}
        className={`${buttonClasses} bg-red-600 hover:bg-red-700 mb-3`}
        disabled={loading}
      >
        <FaGoogle className="mr-3 text-lg" />
        {loading ? "Signing In..." : "Google"}
      </button>

      {/* GitHub Sign-In Button */}
      {/* <button
        onClick={handleGithubLogin}
        className={`${buttonClasses} bg-gray-800 hover:bg-gray-900 mb-3`}
        disabled={loading}
      >
        <FaGithub className="mr-3 text-lg" />
        {loading ? "Signing In..." : "GitHub"}
      </button>

     
      <button
        onClick={handleFacebookLogin}
        className={`${buttonClasses} bg-blue-600 hover:bg-blue-700`}
        disabled={loading}
      >
        <FaFacebookF className="mr-3 text-lg" />
        {loading ? "Signing In..." : "Facebook"}
      </button> */}

    </div>
  );
};

export default SocialAuthSection;