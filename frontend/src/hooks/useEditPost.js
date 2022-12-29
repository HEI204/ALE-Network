import { useMutation, useQueryClient } from "react-query";

const useEditPost = (id, postContent) => {
  const queryClient = useQueryClient();

  const handleUpdatePost = async () => {
    let response = await fetch(`/api/posts/${id}/edit`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: postContent }),
    });

    return await response.json();
  };

  const { mutate: editPost } = useMutation(handleUpdatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("user-created-posts");
    },
  });

  return editPost;
};

export default useEditPost;
