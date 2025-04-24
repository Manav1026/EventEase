import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error + "Invalid email or password");
    }
  };

  return (
    <div>
      <section className="auth-container">
        <h1 className="auth-head">EventEase</h1>
        <div className="auth-box">
          <h2 className="auth-title">Login</h2>
          {error && <p className="auth-error">{error}</p>}
          <form onSubmit={handleLogin} className="auth-form">
            <div>
              <label className="auth-label">Email</label>
              <input
                type="email"
                className="auth-input focus:ring-blue-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="auth-label">Password</label>
              <input
                type="password"
                className="auth-input focus:ring-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-btn auth-btn-blue">
              Sign In
            </button>

            <div>
              <p className="mb-3">
                New to EventEase?{" "}
                <Link to={"/Register"} style={{ color: "blue" }}>
                  SignUp
                </Link>
              </p>
            </div>
          </form>
          <p>--------------------------- or -----------------------------</p>
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
    </div>
  );
};
