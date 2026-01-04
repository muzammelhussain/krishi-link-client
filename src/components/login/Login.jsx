import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaSignInAlt, FaGoogle, FaUserShield } from "react-icons/fa";

// Corrected import path for react-router-dom
import { Link, useLocation, useNavigate } from "react-router"; 
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const SocialAuthSection = ({ handleGoogleSignUp, loading }) => {
    
    const buttonClasses = "w-full btn border-none text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 transition duration-200 shadow-md flex items-center justify-center font-semibold text-base";
    
    return (
        <div className="w-full">
            <div className="divider text-gray-400 font-medium my-4">OR LOG IN WITH</div>
            
            <button
                onClick={handleGoogleSignUp}
                className={buttonClasses}
                disabled={loading}
            >
                <FaGoogle className="mr-3 text-red-500 text-lg" />
                {loading ? "Signing In..." : "Google"}
            </button>
        </div>
    );
};

const Login = () => {
    const { userLogin, signInWithGoogle, setUser, loading, setLoading } = useContext(AuthContext); 
    
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state || "/";

    const DEMO_EMAIL = "demo@krishilink.com";
    const DEMO_PASS = "DemoPass123";
    
    const handleLogin = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        
        const loginEmail = email; 
        const loginPassword = password;

        if (!loginEmail || !loginPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);

        userLogin(loginEmail, loginPassword)
            .then(() => {
                toast.success("Login successful!");
                navigate(from);
            })
            .catch((error) => {
                toast.error(error.message); 
                console.error("Login error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDemoLogin = () => {
        setEmail(DEMO_EMAIL);
        setPassword(DEMO_PASS);
        
        setLoading(true);

        userLogin(DEMO_EMAIL, DEMO_PASS)
            .then(() => {
                toast.success("Demo Login successful!");
                navigate(from);
            })
            .catch((error) => {
                toast.error(error.message || "Failed to log in demo user."); 
                console.error("Demo Login error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleGoogleSignUp = () => {
        setLoading(true);

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
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(newUser),
                })
                    .then((res) => res.json())
                    .then(() => {
                        setUser(currentUser); 
                        toast.success("Signed in with Google!");
                        navigate(from);
                    })
                    .catch((error) => {
                        toast.error("Error saving user data to database.");
                        console.error("DB Save Error:", error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })
            .catch((error) => {
                toast.error(error.message);
                console.error("Google Sign-in error:", error);
                setLoading(false);
            });
    };

    const handleForgot = () => {
        navigate("/forget-password", { state: { email } });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50/70 p-4 sm:p-6">
            <div className="w-full max-w-md">
                
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-green-700 mb-2">
                        🌾 KrishiLink Login
                    </h1>
                    <p className="text-gray-600">Access your dashboard to manage your resources.</p>
                </div>
                
                <div className="card bg-white w-full shadow-2xl rounded-xl border border-green-100 p-6 sm:p-8">
                    
                    <button
                        onClick={handleDemoLogin}
                        className="btn w-full mb-6 bg-yellow-500 hover:bg-yellow-600 border-none text-white text-md font-bold shadow-lg flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        <FaUserShield /> Login as Demo User
                    </button>
                    
                    <div className="divider text-gray-400 font-medium">OR</div>
                    
                    <form onSubmit={handleLogin} className="space-y-4 pt-4">
                        
                        <label className="form-control w-full">
                            <span className="label-text flex items-center font-medium"><FaEnvelope className="mr-2 text-green-500"/>Email</span>
                            <input
                                name="email"
                                type="email"
                                className="input input-bordered w-full focus:border-green-500 transition"
                                placeholder="Email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </label>

                        <label className="form-control w-full">
                            <span className="label-text flex items-center font-medium"><FaLock className="mr-2 text-green-500"/>Password</span>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPass ? "text" : "password"}
                                    className="input input-bordered w-full pr-10 focus:border-green-500 transition"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                                <span
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-green-600 transition"
                                >
                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </label>

                        <div className="text-right">
                            <button
                                type="button"
                                onClick={handleForgot}
                                className="link link-hover text-green-600 font-medium text-sm hover:text-green-700 transition"
                                disabled={loading}
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button 
                            className="btn btn-success w-full mt-6 text-white text-lg font-bold shadow-lg hover:bg-green-700 flex items-center justify-center gap-2"
                            type="submit"
                            disabled={loading}
                        >
                            <FaSignInAlt /> {loading ? "Logging In..." : "Login"}
                        </button>

                        <p className="font-medium text-center pt-4 text-gray-700">
                            Don’t have an account?{" "}
                            <Link to="/register" className="text-green-600 font-bold hover:underline ml-1 transition">
                                Register
                            </Link>
                        </p>
                    </form>

                    <SocialAuthSection handleGoogleSignUp={handleGoogleSignUp} loading={loading} />
                    
                </div>
            </div>
        </div>
    );
};

export default Login;