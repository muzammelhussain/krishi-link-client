import React, { use, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

const ResetPass = () => {
  const { resetPassword } = use(AuthContext);
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");

  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent!");

        window.location.href = "https://mail.google.com/";
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Reset Your Password</h1>
            <p className="text-gray-600 mb-4">
              Enter your registered email to receive a password reset link.
            </p>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
            <form onSubmit={handleReset}>
              <label className="label">Email</label>
              <input
                type="email"
                className="input w-full mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

              <button className="btn btn-primary w-full mt-2">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
