import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import AuthContext from "../context/AuthContext";

const RightSideBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <Col xl={3} className="p-4 border-start border-1">
      {user ? (
        <></>
      ) : (
        <Card>
          <Card.Body className="text-center">
            <Card.Title>Welcome to ALE Network</Card.Title>
            <Card.Text className="text-muted">
              Please login or register to enjoy this web.
            </Card.Text>
            <div className="auth-btn-group flex-column flex-xl-row">
              <Link
                to="/login"
                className="btn btn-skyblue mb-2 mb-xl-0 me-xl-3"
              >
                Login
              </Link>
              <Link to="/register" className="btn btn-skyblue">
                Register
              </Link>
            </div>
          </Card.Body>
        </Card>
      )}
    </Col>
  );
};

export default RightSideBar;
