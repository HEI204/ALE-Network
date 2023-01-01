import { useQuery } from "react-query";

const useUserInfo = (username, page) => {
  const getUserInfo = async ({ queryKey }) => {
    const fetchUsername = queryKey[1];
    let response = await fetch(
      `http://127.0.0.1:8000/api/userinfo/${fetchUsername}`
    );

    if (!response.ok) throw new Error("User not found");

    return await response.json();
  };

  const getUserCreatedPosts = async ({ queryKey }) => {
    const [, fetchUsername, pageNumber] = queryKey;
    let response = await fetch(
      `http://127.0.0.1:8000/api/userinfo/${fetchUsername}/created_posts?page=${pageNumber}`
    );

    if (!response.ok) throw new Error("Cannot load user's post");

    return await response.json();
  };

  const {
    data: userInfo,
    isLoading: loadingUserInfo,
    error: userInfoError,
  } = useQuery(["user-info", username], getUserInfo);

  const {
    data: postsData,
    isLoading: loadingUserPosts,
    error: userPostsError,
  } = useQuery(["user-created-posts", username, page], getUserCreatedPosts, {
    enabled: !!userInfo?.username,
  });

  const loadingUserDetails = loadingUserInfo || loadingUserPosts;

  return {
    userInfo,
    postsData,
    loadingUserDetails,
    userInfoError,
    userPostsError,
  };
};

export default useUserInfo;
