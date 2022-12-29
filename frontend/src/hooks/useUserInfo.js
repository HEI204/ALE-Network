import { useQuery } from "react-query";

const useUserInfo = (username, page) => {
  const getUserInfo = async () => {
    let response = await fetch(
      `/api/userinfo/${username}`
    );
    return await response.json();
  };

  const getUserCreatedPosts = async () => {
    let response = await fetch(
      `/api/userinfo/${username}/created_posts?page=${page}`
    );

    return await response.json();
  };

  const { data: userInfo, isLoading: loadingUserInfo } = useQuery("user-info", getUserInfo);
  const { data: postsData } = useQuery(
    ["user-created-posts", page],
    getUserCreatedPosts
  );

  return { userInfo, postsData, loadingUserInfo };
};

export default useUserInfo;
