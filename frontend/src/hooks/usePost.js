import { useMutation, useQueryClient } from "react-query";

const updatePost = async (id, postContent) => {
  let response = await fetch(`http://127.0.0.1:8000/api/posts/${id}/edit`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: postContent }),
  });

  return await response.json();
};

const likePost = async (id, authToken) => {
  let response = await fetch(`http://127.0.0.1:8000/api/posts/${id}/like`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(authToken.access),
    },
  });

  return await response.json();
};

export const useLikePost = (id, authToken) => {
  const queryClient = useQueryClient();
  return useMutation(() => likePost(id, authToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
};

export const useEditPost = (id, authToken) => {
  const queryClient = useQueryClient();
  return useMutation(() => updatePost(id, authToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
};
