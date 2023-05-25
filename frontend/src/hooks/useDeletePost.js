import { useMutation, useQueryClient } from "react-query";

const useDeletePost = (id, authToken) => {
  const queryClient = useQueryClient();

  const handleDeletePost = async () => {
    let response = await fetch(`/api/posts/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authToken.access),
      },
    });

    return await response.json();
  };

  const { mutate: deletePost } = useMutation(handleDeletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("user-created-posts");
    },
  });

  return deletePost;
};

export default useDeletePost;
