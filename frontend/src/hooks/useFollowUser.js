import { useMutation, useQueryClient } from "react-query";

const useFollowUser = (username, access) => {
  const queryClient = useQueryClient();

  const handleFollow = async () => {
    let response = await fetch(
      `/api/userinfo/${username}/follow`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(access),
        },
      }
    );

    return await response.json();
  };

  const { mutate: followUser } = useMutation(handleFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries("user-info");
    },
  });

  return followUser;
};

export default useFollowUser;
