import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AuthContext from "../context/AuthContext";
import "./RightSideBar.css";
import thumbnail_0 from "../thumbnails/project0.jpg";
import thumbnail_1 from "../thumbnails/project1.png";
import thumbnail_2 from "../thumbnails/project2.jpg";
import thumbnail_3 from "../thumbnails/project3.jpg";


const RightSideBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <Col xl={3} className="p-4 border-start border-1">
      {user ? (
        <Card className="right-sth-might-like border-0">
          <Card.Body className="py-0">
            <p className="py-3 mb-0 right-sth-might-like-title border-1 border-bottom">
              You might interested
            </p>

            <Row className="py-3 thumbnail-container border-bottom">
              <Col md={5}>
                <a href="https://github.com/HEI204/CS50w-Project-0-Search">
                  <img
                    className="img-thumbnail"
                    src={thumbnail_0}
                    alt="project0-thumbnail"
                  />
                </a>
              </Col>
              <Col md={7} className="ps-0">
                <a>Harvard CS50 Web Project 0 (Search)</a>
              </Col>
            </Row>
            <Row className="py-3 thumbnail-container border-bottom">
              <Col md={5}>
                <a href="https://github.com/HEI204/CS50w-Project-1-Wiki">
                  <img
                    className="img-thumbnail"
                    src={thumbnail_1}
                    alt="project1-thumbnail"
                  />
                </a>
              </Col>
              <Col md={7} className="ps-0">
                <a>Harvard CS50 Web Project 1 (Wiki)</a>
              </Col>
            </Row>
            <Row className="py-3 thumbnail-container border-bottom">
              <Col md={5}>
                <a href="https://ale-auction-production.up.railway.app/">
                  <img
                    className="img-thumbnail"
                    src={thumbnail_2}
                    alt="project2-thumbnail"
                  />
                </a>
              </Col>
              <Col md={7} className="ps-0">
                <a>Harvard CS50 Web Project 2 (Commerce)</a>
              </Col>
            </Row>
            <Row className="py-3 thumbnail-container">
              <Col md={5}>
                <a href="https://ale-mail-production.up.railway.app/login">
                  <img
                    className="img-thumbnail"
                    src={thumbnail_3}
                    alt="project3-thumbnail"
                  />
                </a>
              </Col>
              <Col md={7} className="ps-0">
                <a>Harvard CS50 Web Project 3 (Mail)</a>
              </Col>
            </Row>
          </Card.Body>
        </Card>
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
