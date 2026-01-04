import React, { Children, useEffect, useState } from "react";

import {
 createUserWithEmailAndPassword,
GoogleAuthProvider, GithubAuthProvider, 
 FacebookAuthProvider, 
 onAuthStateChanged, sendPasswordResetEmail,
signInWithEmailAndPassword, signInWithPopup,
 signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider(); // <-- Initialize GitHub Provider
const facebookProvider = new FacebookAuthProvider(); // <-- Initialize Facebook Provider

const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

// --- Social Sign-In Methods ---
 const signInWithGoogle = () => {
 setLoading(true);
 return signInWithPopup(auth, googleProvider);
 };

 const signInWithGithub = () => { // <-- New GitHub Sign-In Function
 setLoading(true);
 return signInWithPopup(auth, githubProvider);
 };

 const signInWithFacebook = () => { // <-- New Facebook Sign-In Function
 setLoading(true);
 return signInWithPopup(auth, facebookProvider); };
 
 // --- Email/Password Methods ---
 const createUser = (email, password) => {
 setLoading(true);
 return createUserWithEmailAndPassword(auth, email, password);
 };

 const userLogin = (email, password) => {
 setLoading(true);
 return signInWithEmailAndPassword(auth, email, password);
 };

 const resetPassword = (email) => {
 return sendPasswordResetEmail(auth, email);
 };

 const userLogout = () => {
 return signOut(auth); };

 useEffect(() => {
 const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
 setUser(currentUser);
 setLoading(false);
 });
 return () => unsubscribe();
 }, []);

 const authInfo = {
 createUser,
 signInWithGoogle,
    signInWithGithub, 
    signInWithFacebook, 
 user,
 setUser,
 loading,
 userLogin,
 userLogout,
 resetPassword,
 setLoading,
 };
 return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;