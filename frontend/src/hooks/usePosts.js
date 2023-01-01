import { useQuery, useMutation, useQueryClient } from "react-query";

const getPosts = async ({ queryKey }) => {
  const [, type, user, page] = queryKey;
  let response;

  if (type === "all") {
    response = await fetch(`/api/posts?page=${page}`);
  } else if (type === "following") {
    response = await fetch(
      `/api/userinfo/${user?.username}/following?page=${page}`
    );
  } else {
    response = await fetch(
      `/api/userinfo/${user?.username}/liked_posts?page=${page}`
    );
  }

  if (!response.ok) throw new Error("Cannot load the posts");

  return await response.json();
};

const createNewPost = async (newPostContent, authToken) => {
  let response = await fetch("/api/posts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(authToken.access),
    },
    body: JSON.stringify({ content: newPostContent }),
  });

  return await response.json();
};

export const usePosts = (type, user, page) => {
  return useQuery(["posts", type, user, page], getPosts, {
    keepPreviousData: true,
  });
};

export const useNewPost = (newPostContent, authToken) => {
  const queryClient = useQueryClient();
  return useMutation(() => createNewPost(newPostContent, authToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
};
