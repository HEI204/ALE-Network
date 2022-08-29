import React, { useState, useContext } from "react";

import AuthContext from "../context/AuthContext";
import Alert from "./Alert";

const AuthForm = ({ authMode }) => {
  const { handleLogin } = useContext(AuthContext);
  const [SuccessfulLogin, setSuccessfulLogin] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  async function submitLoginForm(event) {
    event.preventDefault();
    let response = await handleLogin(formData.username, formData.password);

    if (response === false) {
      setSuccessfulLogin(false);
      event.target.username.value = "";
      event.target.password.value = "";
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmation: formData.confirmPassword,
      }),
    });

    let data = await response.json();

    if (response.ok) console.log(`Register successfully : ${data}`);
    else console.log("Fail");
  }

  return (
    <>
      {authMode === "login" && !SuccessfulLogin && (
        <Alert
          alertType="danger"
          message="Incorrect username and/or password. Please try again."
        />
      )}

      {authMode === "register" &&
        formData.password !== "" &&
        formData.password.length <= 7 && (
          <Alert
            alertType="danger"
            message="Password must be at least 7 digit long."
          />
        )}

      {authMode === "register" &&
        formData.confirmPassword !== "" &&
        formData.password !== formData.confirmPassword && (
          <Alert
            alertType="danger"
            message="Confimation password must be same as the password."
          />
        )}

      <form
        className="my-3"
        onSubmit={authMode === "login" ? submitLoginForm : handleRegister}
      >
        <div className="form-group form-floating mb-4">
          <input
            autoFocus
            className="form-control shadow-none"
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            required
            onChange={handleChange}
          />
          <label htmlFor="username">Username</label>
        </div>
        {authMode === "register" && (
          <div className="form-group form-floating mb-4">
            <input
              className="form-control shadow-none"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              required
              onChange={handleChange}
            />
            <label htmlFor="username">Email</label>
          </div>
        )}
        <div className="form-group form-floating mb-4">
          <input
            className="form-control shadow-none"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            required
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
        </div>
        {authMode === "register" && (
          <div className="form-group form-floating mb-5">
            <input
              className="form-control shadow-none"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              required
              onChange={handleChange}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
        )}
        <input
          className="btn btn-skyblue shadow-none w-100 mt-3"
          type="submit"
          value={authMode[0].toUpperCase() + authMode.slice(1)}
        />
      </form>
    </>
  );
};

export default AuthForm;
