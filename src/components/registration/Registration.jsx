import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router"; 
import { updateProfile } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import SocialAuthSection from "../registration/SocialAuthSection";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa"; 

const Registration = () => {
  const [showPass, setShowPass] = useState(false);
  const { 
    signInWithGoogle, 
    signInWithGithub, 
    signInWithFacebook, 
    setUser, 
    createUser, 
    loading, 
    setLoading 
  } = useContext(AuthContext); 
  const navigate = useNavigate();

  
  const saveUserToDB = (res) => {
    const currentUser = res.user;
    const newUser = {
      name: currentUser.displayName,
      email: currentUser.email,
      image: currentUser.photoURL,
    };

    fetch("https://krishi-link-api-server.vercel.app/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then(() => {
        setUser(currentUser);
        toast.success(`Signed in with ${currentUser.providerData[0].providerId.split('.')[0]}!`);
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error saving user to database.");
        console.error(error);
        setLoading(false);
      });
  };

  // --- Social Login Handlers ---
  const handleGoogleSignUp = () => {
    setLoading(true);
    signInWithGoogle()
      .then(saveUserToDB)
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
        setLoading(false);
      });
  };

  const handleGithubLogin = () => { // <-- New Handler
    setLoading(true);
    signInWithGithub()
      .then(saveUserToDB)
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
        setLoading(false);
      });
  };

  const handleFacebookLogin = () => { // <-- New Handler
    setLoading(true);
    signInWithFacebook()
      .then(saveUserToDB)
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
        setLoading(false);
      });
  };


  // --- Email/Password Registration Handler (Existing logic refined) ---
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const pass = form.password.value;

    if (pass.length < 6 || !/[A-Z]/.test(pass) || !/[a-z]/.test(pass)) {
      toast.error("Password must be at least 6 characters, including uppercase and lowercase letters!");
      return;
    }

    setLoading(true);

    createUser(email, pass)
      .then((res) => {
        const createdUser = res.user;

        updateProfile(createdUser, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          // Save user to MongoDB (reusing the saveUserToDB structure)
          saveUserToDB({ 
              user: { 
                  ...createdUser, 
                  displayName: name, 
                  photoURL: photo, 
                  providerData: [{ providerId: 'password' }] 
              } 
          });
        });
      })
      .catch((error) => {
        console.log("Registration error:", error);
        toast.error(error.message || "Registration failed!");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-green-700 mb-2">
            🌱 Join KrishiLink
          </h1>
          <p className="text-gray-600">Create your new account to connect with the farming community.</p>
        </div>
        
        <div className="card bg-white w-full shadow-2xl rounded-xl border border-green-100 p-6 sm:p-8">
          
          {/* Email/Password Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Name */}
            <label className="form-control w-full">
                <span className="label-text flex items-center font-medium"><FaUser className="mr-2 text-green-500"/>Your Name</span>
                <input
                  name="name"
                  type="text"
                  className="input input-bordered w-full focus:border-green-500 transition"
                  placeholder="Enter your name"
                  required
                />
            </label>

            {/* Photo URL */}
            <label className="form-control w-full">
                <span className="label-text flex items-center font-medium"><FaImage className="mr-2 text-green-500"/>Photo URL</span>
                <input
                  name="photo"
                  type="url"
                  className="input input-bordered w-full focus:border-green-500 transition"
                  placeholder="Link to your profile photo"
                  required
                />
            </label>

            {/* Email */}
            <label className="form-control w-full">
                <span className="label-text flex items-center font-medium"><FaEnvelope className="mr-2 text-green-500"/>Email</span>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full focus:border-green-500 transition"
                  placeholder="Email"
                  required
                />
            </label>

            {/* Password */}
            <label className="form-control w-full">
                <span className="label-text flex items-center font-medium"><FaLock className="mr-2 text-green-500"/>Password</span>
                <div className="relative">
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    className="input input-bordered w-full pr-10 focus:border-green-500 transition"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 transition"
                  >
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <span className="label-text-alt mt-1 text-gray-500">
                    Min 6 characters, at least one uppercase and one lowercase letter.
                </span>
            </label>

            <button type="submit" className="btn btn-success w-full mt-6 text-white text-lg font-bold shadow-lg hover:bg-green-700" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            {/* Already have an account link */}
            <p className="font-medium text-center pt-4 text-gray-700">
              Already have an account?
              <Link to="/login" className="text-green-600 font-bold hover:underline ml-1 transition">
                Login
              </Link>
            </p>
          </form>

          {/* Social Login Section */}
          <SocialAuthSection 
            handleGoogleSignUp={handleGoogleSignUp} 
            // handleGithubLogin={handleGithubLogin} 
            // handleFacebookLogin={handleFacebookLogin} 
          />
          
        </div>
      </div>
    </div>
  );
};

export default Registration;