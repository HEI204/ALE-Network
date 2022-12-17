import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";

import Post from "../components/Post";
import AuthContext from "../context/AuthContext";
import "./UserProfilePage.css";

function UserProfilePage() {
  const { user, authToken, handleLogout } = useContext(AuthContext);
  const [pageController, setPageController] = useState({
    current: 1,
    next: null,
    previous: null,
  });
  const [loading, setLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState({
    userInfo: null,
    createdPost: null,
    isFollow: null,
  });

  let { username: usernameFromParams } = useParams();

  const getUserInfo = useCallback(async () => {
    let response = await fetch(
      `/api/userinfo/${usernameFromParams}`
    );
    let userData = await response.json();

    response = await fetch(
      `/api/userinfo/${usernameFromParams}/created_posts?page=${pageController.current}`
    );

    let postsData = await response.json();

    setProfileInfo({
      userInfo: userData,
      createdPosts: postsData.results,
      isFollow: !!userData?.followers_details.filter(
        (follower) => follower.user === user?.user_id
      ).length,
    });

    setPageController((prevState) => ({
      ...prevState,
      next: postsData.next,
      previous: postsData.previous,
    }));

    setLoading(false);
  }, [usernameFromParams, user?.user_id, pageController.current]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  function handleFollow() {
    fetch(`/api/userinfo/${usernameFromParams}/follow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authToken.access),
      },
    });

    let newFollowersCount;
    if (profileInfo.isFollow)
      newFollowersCount = profileInfo.userInfo.followers - 1;
    else newFollowersCount = profileInfo.userInfo.followers + 1;

    setProfileInfo((prevInfo) => ({
      ...prevInfo,
      userInfo: {
        ...prevInfo.userInfo,
        followers: newFollowersCount,
      },
      isFollow: !prevInfo.isFollow,
    }));
  }

  function handlePageChange(direction) {
    if (direction === "prev")
      setPageController((prevState) => ({
        ...prevState,
        current: prevState.current - 1,
      }));
    else
      setPageController((prevState) => ({
        ...prevState,
        current: prevState.current + 1,
      }));
  }

  return (
    <>
      {!loading && (
        <>
          <div className="profile-header border-bottom border-1">
            <p id="username" className="text-center my-auto">
              {usernameFromParams}
            </p>

            {user?.username === usernameFromParams && (
              <div className="logout-section">
                <button
                  className="btn btn-lightred w-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <div className="profile-info row g-0 p-3 p-md-4 justify-content-center">
            <img
              className="user-icon col-4 me-4 me-md-0"
              alt="user-icon"
              src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
            />

            <div className="profile-status col-8">
              <div id="user-post-number">
                <span
                  className={
                    "fw-bolder " +
                    (profileInfo.userInfo.posts === 0 ? "text-muted" : "")
                  }
                >
                  {profileInfo.userInfo.posts}
                </span>
                <span>Posts</span>
              </div>

              <div id="user-follower-number">
                <span
                  className={
                    "fw-bolder " +
                    (profileInfo.userInfo.followers === 0 ? "text-muted" : "")
                  }
                >
                  {profileInfo.userInfo.followers}
                </span>
                <span>Followers</span>
              </div>

              <div id="user-following-number">
                <span
                  className={
                    "fw-bolder " +
                    (profileInfo.userInfo.following === 0 ? "text-muted" : "")
                  }
                >
                  {profileInfo.userInfo.following}
                </span>
                <span>Following</span>
              </div>
            </div>

            {user && user.username !== usernameFromParams && (
              <div className="follow-btn-groups row mt-4 px-3 px-md-4">
                {profileInfo.isFollow ? (
                  <button
                    className="btn btn-lightred text-center"
                    onClick={() => handleFollow()}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="btn btn-skyblue text-center"
                    onClick={() => handleFollow()}
                  >
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>
          <hr className="w-100" />
          <div className="mt-4 mt-md-5 px-2 px-3 px-md-5 profile-posts-container">
            {profileInfo.createdPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>

          <div className="mb-5 px-2 px-md-5 d-flex justify-content-center">
            {pageController.previous && (
              <button
                className="btn btn-skyblue"
                onClick={() => handlePageChange("prev")}
              >
                Previous
              </button>
            )}
            {pageController.next && (
              <button
                className="btn btn-skyblue"
                onClick={() => handlePageChange("next")}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default UserProfilePage;
