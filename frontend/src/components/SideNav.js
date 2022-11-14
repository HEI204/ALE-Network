import React, { memo, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const SideNav = memo(({ links }) => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="side-nav min-vh-100 ps-xl-4">
      <div className="mt-3 mb-4 ps-xl-1">
        <i className="bi bi-twitter"></i>
      </div>

      <ul className="nav-list ps-xl-1 mb-3">
        {links
          .filter((link) => link.show)
          .map(({ linkTo, icon, text }) => {
            return (
              <li key={text}>
                <NavLink
                  to={linkTo}
                  className={({ isActive }) =>
                    "nav-list-link pb-3 " + (isActive ? "active" : "")
                  }
                >
                  <i className={`pe-xl-3 ${icon}`}></i>
                  <div className="d-none d-xl-inline align-self-center">
                    {text}
                  </div>
                </NavLink>
              </li>
            );
          })}

        {!user && (
          <li className="d-xl-none">
            <Link to="/login" className="nav-list-link">
              <i className="bi bi-door-open"></i>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
});

export default SideNav;
