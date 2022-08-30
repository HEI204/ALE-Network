import React, { useState, useContext } from "react";
import { useFormik } from "formik";

import AuthContext from "../context/AuthContext";
import Alert from "./Alert";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

const LoginForm = () => {
  const { handleLogin } = useContext(AuthContext);
  const [SuccessfulLogin, setSuccessfulLogin] = useState(true);

  async function submitLoginForm(username, password) {
    let response = await handleLogin(username, password);

    if (response === false) setSuccessfulLogin(false);
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => submitLoginForm(values.username, values.password),
  });

  return (
    <>
      {!SuccessfulLogin && (
        <Alert
          alertType="danger"
          message="Incorrect username and/or password. Please try again."
        />
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
        </div>

        <input
          className="btn btn-skyblue shadow-none w-100 mt-3"
          type="submit"
          value="Login"
        />
      </form>
    </>
  );
};

export default LoginForm;
