import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCred.user, {
        displayName: fullName,
      });
      await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: userCred.user.uid,
          fullName,
          email,
          role,
        }),
      });
      navigate("/dashboard");
    } catch (error) {
      setError(error + "Failed to register. Try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError("Google login failed: " + error.message);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError("Facebook login failed: " + error.message);
    }
  };

  return (
    <section className="auth-container">
      <h2 className="auth-head mt-1">EventEase</h2>
      <div className="auth-box mb-1">
        <h2 className="auth-title">Registration</h2>
        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleRegister} className="auth-form">
          <div>
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              placeholder="First and Last Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="auth-input focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="auth-label">Role</label>
            <select
              className="auth-input focus:ring-green-500"
              onChange={(e) => {
                setRole(e.target.value);
              }}>
              <option value="#">Select Option</option>
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
          <div>
            <label className="auth-label">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="auth-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input focus:ring-green-500"
              required
            />
          </div>

          <button type="submit" className="auth-btn auth-btn-green mb-5">
            Register
          </button>
        </form>
        <p>---------------------------- or ----------------------------</p>
        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="auth-btn-google">
            <FcGoogle className="inline mr-2 text-lg" />
            Continue with Google
          </button>

          <button
            type="button"
            onClick={handleFacebookLogin}
            className="auth-btn-facebook">
            <FaFacebookF className="inline mr-2 text-lg" />
            Continue with Facebook
          </button>
        </div>
      </div>
    </section>
  );
};
