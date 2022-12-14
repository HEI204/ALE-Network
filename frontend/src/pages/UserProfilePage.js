import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import Loading from "../components/Loading";
import ShowPosts from "../components/ShowPosts";

import usePagination from "../hooks/usePagination";
import useFollowUser from "../hooks/useFollowUser";
import useUserInfo from "../hooks/useUserInfo";

import "./UserProfilePage.css";
import profileImage from "../images/default_profile_image.png";

function UserProfilePage() {
  const { user, authToken, handleLogout } = useContext(AuthContext);
  const { pageNumber, handlePageChange } = usePagination();
  const { username: usernameFromParams } = useParams();

  const followUser = useFollowUser(usernameFromParams, authToken?.access);
  const {
    userInfo,
    postsData,
    loadingUserInfo,
    loadingUserPosts,
    userInfoError,
    userPostsError,
  } = useUserInfo(usernameFromParams, pageNumber);

  const createdPosts = postsData?.results;
  const isFollow = !!userInfo?.followers_details.filter(
    (follower) => follower.user === user?.user_id
  ).length;

  if (loadingUserInfo) return <Loading />;

  return (
    <>
      <div className="profile-header border-bottom border-1">
        <p id="username" className="text-center my-auto">
          {userInfoError ? "User Not Found" : usernameFromParams}
        </p>

        {user?.username === usernameFromParams && (
          <div className="logout-section">
            <button className="btn btn-lightred w-100" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="profile-info row g-0 p-3 p-md-4 justify-content-center">
        <img
          className="user-icon col-4 me-4 me-md-0"
          alt="user-icon"
          src={profileImage}
        />

        <div className="profile-status col-8">
          <div id="user-post-number">
            <span
              className={
                "fw-bolder " + (userInfo?.posts === 0 ? "text-muted" : "")
              }
            >
              {userInfo?.posts}
            </span>
            <span>Posts</span>
          </div>

          <div id="user-follower-number">
            <span
              className={
                "fw-bolder " + (userInfo?.followers === 0 ? "text-muted" : "")
              }
            >
              {userInfo?.followers}
            </span>
            <span>Followers</span>
          </div>

          <div id="user-following-number">
            <span
              className={
                "fw-bolder " + (userInfo?.following === 0 ? "text-muted" : "")
              }
            >
              {userInfo?.following}
            </span>
            <span>Following</span>
          </div>
        </div>

        {!userInfoError && user && user?.username !== usernameFromParams && (
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

      {!userInfoError && (
        <>
          <div className="mt-4 mt-md-5 px-2 px-3 px-md-5 profile-posts-container">
            <ShowPosts
              loading={loadingUserPosts}
              error={userPostsError}
              posts={createdPosts}
            />
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
