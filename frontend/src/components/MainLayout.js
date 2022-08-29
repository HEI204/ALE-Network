import React, { memo } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";
import Col from "react-bootstrap/Col";

import Navigation from "./Navigation";
import RightSideBar from "./RightSideBar";

const MainLayout = memo(() => {
  const xLargeScreenSize = useMediaQuery({ query: "(min-width: 1200px)" });
  const MediumScreenSize = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <>
      <Navigation />
      <Col
        md
        lg={11}
        xl={7}
        className={
          "main-backgroud" +
          (MediumScreenSize ? " offset-md-1 offset-xl-2" : "")
        }
      >
        <Outlet />
      </Col>
      {xLargeScreenSize && <RightSideBar />}
    </>
  );
});

export default MainLayout;
