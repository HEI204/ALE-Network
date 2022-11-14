import React, { useMemo, useContext } from "react";
import { useMediaQuery } from "react-responsive";

import SideNav from "./SideNav";
import SmallScreenNav from "./SmallScreenNav";
import AuthContext from "../context/AuthContext";

import "../Navigation.css";

const Navigation = () => {
  const { user } = useContext(AuthContext);

  const links = useMemo(
    () => [
      { show: true, linkTo: "/", icon: "bi bi-house-fill", text: "All Posts" },
      {
        show: !!user,
        linkTo: `/following_posts`,
        icon: "bi bi-hash",
        text: "Following",
      },
      {
        show: !!user,
        linkTo: "/liked_posts",
        icon: "bi bi-bookmark",
        text: "Bookmarks",
      },
      {
        show: !!user,
        linkTo: `${user?.username}/profile`,
        icon: "bi bi-person-square",
        text: "Profile",
      },
    ],
    [user]
  );

  const MediumScreenSize = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <>
      {MediumScreenSize ? (
        <div className="col-md-1 col-xl-2 border-end border-1 fixed-top">
          <SideNav links={links} />
        </div>
      ) : (
        <>
          <SmallScreenNav links={links} />
        </>
      )}
    </>
  );
};

export default Navigation;
