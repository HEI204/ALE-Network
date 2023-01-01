import { useMutation, useQueryClient } from "react-query";

const useLikePost = (id, access) => {
  const queryClient = useQueryClient();

  const handleLikePost = async () => {
    let response = await fetch(`/api/posts/${id}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(access),
      },
    });

    return await response.json();
  };

  const { mutate: likePost } = useMutation(handleLikePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("user-created-posts");
    },
  });

  return likePost;
};

export default useLikePost;
