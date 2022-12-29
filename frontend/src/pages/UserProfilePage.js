import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import Post from "../components/Post";
import AuthContext from "../context/AuthContext";

import usePagination from "../hooks/usePagination";
import useFollowUser from "../hooks/useFollowUser";
import useUserInfo from "../hooks/useUserInfo";

import "./UserProfilePage.css";

function UserProfilePage() {
  const { user, authToken, handleLogout } = useContext(AuthContext);
  const { pageNumber, handlePageChange } = usePagination();
  const { username: usernameFromParams } = useParams();

  const followUser = useFollowUser(usernameFromParams, authToken?.access);
  const { userInfo, postsData, loadingUserInfo } = useUserInfo(
    usernameFromParams,
    pageNumber
  );

  const createdPosts = postsData?.results;
  const isFollow = !!userInfo?.followers_details.filter(
    (follower) => follower.user === user?.user_id
  ).length;

  return (
    <>
      {!loadingUserInfo && (
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
                    "fw-bolder " + (userInfo?.posts === 0 ? "text-muted" : "")
                  }
                >
                  {userInfo.posts}
                </span>
                <span>Posts</span>
              </div>

              <div id="user-follower-number">
                <span
                  className={
                    "fw-bolder " +
                    (userInfo?.followers === 0 ? "text-muted" : "")
                  }
                >
                  {userInfo?.followers}
                </span>
                <span>Followers</span>
              </div>

              <div id="user-following-number">
                <span
                  className={
                    "fw-bolder " +
                    (userInfo?.following === 0 ? "text-muted" : "")
                  }
                >
                  {userInfo?.following}
                </span>
                <span>Following</span>
              </div>
            </div>

            {user && user.username !== usernameFromParams && (
              <div className="follow-btn-groups row mt-4 px-3 px-md-4">
                {isFollow ? (
                  <button
                    className="btn btn-lightred text-center"
                    onClick={followUser}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="btn btn-skyblue text-center"
                    onClick={followUser}
                  >
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>
          <hr className="w-100" />
          <div className="mt-4 mt-md-5 px-2 px-3 px-md-5 profile-posts-container">
            {createdPosts?.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>

          <div className="mb-5 px-2 px-md-5 d-flex justify-content-center">
            {postsData?.previous && (
              <button
                className="btn btn-skyblue me-3"
                onClick={() => handlePageChange("prev")}
              >
                Previous
              </button>
            )}
            {postsData?.next && (
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
