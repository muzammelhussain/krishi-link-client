import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router"; 
import { toast } from "react-toastify";
import { FaEnvelope, FaLockOpen, FaArrowLeft } from "react-icons/fa"; 

const ResetPass = () => {
  
  const { resetPassword, loading, setLoading } = useContext(AuthContext); 
  const location = useLocation();
  const navigate = useNavigate();

  
  const [email, setEmail] = useState(location.state?.email || "");
  const [isSending, setIsSending] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsSending(true); // Set local sending state

    resetPassword(email)
      .then(() => {
        
        toast.success("Password reset email sent! Check your inbox.");
        
       
        setTimeout(() => {
            navigate("/login"); 
        }, 3000); 

      })
      .catch((error) => {
       
        toast.error(error.message || "Failed to send reset email.");
        console.error("Password reset error:", error);
      })
      .finally(() => {
        setIsSending(false); state
      });
  };
  
  const isDisabled = isSending || loading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50/70 p-4 sm:p-6">
      <div className="w-full max-w-md">

        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-green-700 mb-2">
            <FaLockOpen className="inline mr-2" /> Reset Password
          </h1>
          <p className="text-gray-600">
            Enter your registered email to receive a secure password reset link.
          </p>
        </div>

        {/* Reset Card */}
        <div className="card bg-white w-full shadow-2xl rounded-xl border border-green-100 p-6 sm:p-8">
          <form onSubmit={handleReset} className="space-y-4">
            
            {/* Email Input */}
            <label className="form-control w-full">
              <span className="label-text flex items-center font-medium">
                <FaEnvelope className="mr-2 text-green-500" /> Email Address
              </span>
              <input
                type="email"
                className="input input-bordered w-full focus:border-green-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isDisabled}
              />
            </label>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-success w-full mt-6 text-white text-lg font-bold shadow-lg hover:bg-green-700"
              disabled={isDisabled}
            >
              {isDisabled ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
          
          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <button 
                onClick={() => navigate("/login")}
                className="text-gray-600 hover:text-green-600 font-medium flex items-center justify-center w-full transition"
                disabled={isDisabled}
            >
                <FaArrowLeft className="mr-2" /> Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;