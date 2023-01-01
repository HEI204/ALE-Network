import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";

import AuthContext from "../context/AuthContext";

import { usePosts, useNewPost } from "../hooks/usePosts";
import usePagination from "../hooks/usePagination";

import ShowPosts from "../components/ShowPosts";
import "./Post.css";

const PostList = ({ type }) => {
  const { pageNumber, handlePageChange } = usePagination();
  const [newPostContent, setNewPostContent] = useState("");
  const { user, authToken } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data, isLoading, error } = usePosts(type, user, pageNumber);
  const { mutate: createPost } = useNewPost(newPostContent, authToken);

  let pageTitle;
  if (type === "all") pageTitle = "All Posts";
  else if (type === "following") pageTitle = "Following Posts";
  else pageTitle = "Liked Posts";

  const handleChange = (event) => {
    setNewPostContent(event.target.value);
  };

  const handleCreatePost = async () => {
    createPost(newPostContent, authToken);
    setNewPostContent("");
    handleClose();
  };

  return (
    <>
      <div className="posts-container-title d-none d-md-block border-bottom border-1 ps-4 py-3">
        {pageTitle}
      </div>

      {user && (
        <>
          <div className="create-post d-none d-md-block border-bottom border-1 p-3">
            <textarea
              className="w-75 border-0"
              rows="2"
              maxLength="280"
              name="content"
              value={newPostContent}
              placeholder={`What's on your mind, ${user?.username}?`}
              onChange={handleChange}
            ></textarea>
            <button className="btn btn-skyblue" onClick={handleCreatePost}>
              Post
            </button>
          </div>

          <div
            className="d-md-none small-screen-create-post"
            onClick={handleShow}
          >
            <i className="bi bi-plus"></i>
          </div>
        </>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="w-100 border-0"
            rows="5"
            maxLength="280"
            name="content"
            value={newPostContent}
            placeholder={`What's on your mind, ${user?.username}?`}
            onChange={handleChange}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-skyblue" onClick={handleCreatePost}>
            Post
          </button>
        </Modal.Footer>
      </Modal>

      <div className="my-md-5 px-2 px-md-5 posts-container">
        <ShowPosts loading={isLoading} error={error} posts={data?.results} />
      </div>

      <div className="mb-5 pb-4 px-2 px-md-5 d-flex justify-content-center">
        {data?.previous && (
          <button
            className="btn btn-skyblue me-3"
            onClick={() => handlePageChange("prev")}
          >
            Previous
          </button>
        )}
        {data?.next && (
          <button
            className="btn btn-skyblue"
            onClick={() => handlePageChange("next")}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default PostList;
