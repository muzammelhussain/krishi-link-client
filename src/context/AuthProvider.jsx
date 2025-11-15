import React, { Children, useState } from "react";
import { AuthContext } from "./Authcontext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ Children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const authInfo = {
    signInWithGoogle,
  };
  return <AuthContext value={authInfo}>{Children}</AuthContext>;
};

export default AuthProvider;
