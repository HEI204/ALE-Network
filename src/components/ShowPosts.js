import React from "react";
import Post from "./Post";
import Loading from "./Loading";

const ShowPosts = ({ loading, error, posts }) => {
  if (loading) return <Loading fixed={true} />;
  else if (error) return <div className="text-center">{error}</div>;
  else if (posts?.length === 0)
    return <div className="text-center">Do not have any posts yet... </div>;
  else return posts?.map((post) => <Post key={post.id} post={post} />);
};

export default ShowPosts;
