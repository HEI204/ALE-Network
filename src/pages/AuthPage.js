import React from "react";
import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "./AuthPage.css";

function AuthPage({ authMode }) {
  let description, targetLink, linkText;
  if (authMode === "register") {
    description = "Create your ALE-Network Account to enjoy the service.";
    targetLink = "/login";
    linkText = "Already have an account?";
  } else {
    description = "Enter your ALE-Network Account details.";
    targetLink = "/register";
    linkText = "Don't have an account?";
  }

  return (
    <div className="auth-form container">
      <div className="row mt-3 justify-content-center align-items-center">
        <div className="col-md-10 col-lg-6">
          <div className="card border-0">
            <div className="card-body">
              <div className="mb-4">
                <h2 className="fw-bold">
                  {authMode[0].toUpperCase() + authMode.slice(1)}
                </h2>
                <p className="text-muted">{description}</p>
              </div>

              {authMode === "login" ? <LoginForm /> : <RegisterForm />}

              <div className="card-footer bg-white border-0 text-center">
                <Link to={targetLink}>{linkText}</Link>
                <Link to="/">Back to homepage</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
