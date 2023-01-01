import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import Alert from "./Alert";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length < 3 || values.username.length > 25) {
    errors.username = "Username must be between 3 and 25 characters";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length <= 7) {
    errors.password = "Password must be has at least 8 character";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Must be same as the password";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const RegiserForm = () => {
  const navigate = useNavigate();
  const [SuccessfulRegister, setSuccessfulRegister] = useState(true);

  async function handleRegister(username, email, password) {
    let response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!response.ok) setSuccessfulRegister(false);
    else navigate("/login");
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) =>
      handleRegister(values.username, values.email, values.password),
  });

  return (
    <>
      {!SuccessfulRegister && (
        <Alert alertType="danger" message="Username has been taken by other." />
      )}

      <form
        className="my-3"
        onSubmit={(event) => {
          event.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div className="form-group form-floating mb-4">
          <input
            autoFocus
            className={
              "form-control shadow-none" +
              (formik.touched.username && formik.errors.username
                ? " error"
                : "")
            }
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="username"
            className={
              formik.touched.username && formik.errors.username
                ? "label-error"
                : ""
            }
          >
            Username
          </label>
          {formik.touched.username && formik.errors.username ? (
            <div className="error-message">{formik.errors.username}</div>
          ) : null}
        </div>

        <div className="form-group form-floating mb-4">
          <input
            className={
              "form-control shadow-none" +
              (formik.touched.email && formik.errors.email ? " error" : "")
            }
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="email"
            className={
              formik.touched.email && formik.errors.email ? "label-error" : ""
            }
          >
            Email
          </label>
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group form-floating mb-4">
          <input
            className={
              "form-control shadow-none" +
              (formik.touched.password && formik.errors.password
                ? " error"
                : "")
            }
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="password"
            className={
              formik.touched.password && formik.errors.password
                ? "label-error"
                : ""
            }
          >
            Password
          </label>
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="form-group form-floating mb-5">
          <input
            className={
              "form-control shadow-none" +
              (formik.touched.confirmPassword && formik.errors.confirmPassword
                ? " error"
                : "")
            }
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="confirmPassword"
            className={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "label-error"
                : ""
            }
          >
            Confirm Password
          </label>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error-message">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        <input
          className="btn btn-skyblue shadow-none w-100 mt-3"
          type="submit"
          value="Register"
        />
      </form>
    </>
  );
};

export default RegiserForm;
