import React, { memo, useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import logo from "../images/logo.png";

const SmallScreenNav = memo(({ links }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar bg-white bg-white fixed-top min-vw-100 border-bottom border-1">
        <img className="ms-4 img-fluid" src={logo} width="55" height="55" />

        <div className="me-4">
          {!user && (
            <Link to="/login" className="btn btn-skyblue w-100">
              Login
            </Link>
          )}
        </div>
      </nav>

      <footer className="navbar justify-content-center bg-white fixed-bottom shadow min-vw-100 border-top border-1">
        <ul className="small-screen-nav d-flex justify-content-evenly ps-0 my-auto">
          {links
            .filter((link) => link.show)
            .map(({ linkTo, icon, text }) => {
              return (
                <li key={text}>
                  <NavLink
                    to={linkTo}
                    className={({ isActive }) =>
                      "nav-list-link px-3 " + (isActive ? "active" : "")
                    }
                  >
                    <i className={icon}></i>
                  </NavLink>
                </li>
              );
            })}
        </ul>
      </footer>
    </>
  );
});

export default SmallScreenNav;
