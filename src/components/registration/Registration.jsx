import React, { use, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const Registration = () => {
  const [showPass, setShowPass] = useState(false);
  const { signInWithGoogle, user, setUser, createUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const pass = form.password.value;

    if (!name || !photo || !email || !pass) {
      toast.error("Please fill in all fields!");
      return;
    }
    if (pass.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }
    if (!/[A-Z]/.test(pass)) {
      toast.error("Password must contain at least one uppercase letter!");
      return;
    }
    if (!/[a-z]/.test(pass)) {
      toast.error("Password must contain at least one lowercase letter!");
      return;
    }

    createUser(email, pass)
      .then((res) => {
        const createdUser = res.user;

        //  Update Firebase profile
        updateProfile(createdUser, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          // Build the user object to save in database
          const newUser = {
            name: name,
            email: email,
            image: photo,
          };

          // Save user to MongoDB
          fetch("https://krishi-link-api-server.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("User saved to DB:", data);
              toast.success("Registration successful!");
              navigate("/");
              setUser({
                ...createdUser,
                displayName: name,
                photoURL: photo,
              });
            });
        });
      })
      .catch((error) => {
        console.log("Registration error:", error);
        toast.error(error.message || "Registration failed!");
      });
  };

  const handleGoogleSignUp = () => {
    signInWithGoogle()
      .then((res) => {
        const currentUser = res.user;
        const newUser = {
          name: res.user.displayName,
          email: res.user.email,
          image: res.user.photoURL,
        };
        fetch("https://krishi-link-api-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data after user save", data);
            setUser(currentUser);
            console.log(currentUser);
            toast.success("Signed in with Google!");
          });
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Register Now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <fieldset className="fieldset">
                  <label className="label">Your Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input"
                    placeholder="Enter your name"
                  />

                  <label className="label">Photo URL</label>
                  <input
                    name="photo"
                    type="text"
                    className="input"
                    placeholder="Photo URL"
                  />

                  <label className="label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input"
                    placeholder="Email"
                  />

                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPass ? "text" : "password"}
                      className="input w-full pr-10"
                      placeholder="Password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <button type="submit" className="btn btn-neutral mt-4">
                    Register
                  </button>

                  <p className="font-semibold text-center my-6">
                    Already have an account?
                    <Link to="/login" className="text-secondary">
                      Login
                    </Link>
                  </p>
                </fieldset>
              </form>
              {/* Google */}
              <button
                onClick={handleGoogleSignUp}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
