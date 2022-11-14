import React, { useState, useEffect, useCallback, useContext } from "react";
import Modal from "react-bootstrap/Modal";

import Post from "../components/Post";
import AuthContext from "../context/AuthContext";

import "../Post.css";

const PostList = ({ type }) => {
  const [posts, setPosts] = useState([]);
  const [pageController, setPageController] = useState({
    current: 1,
    next: null,
    previous: null,
  });
  const [newPostContent, setNewPostContent] = useState("");
  const { user, authToken } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let pageTitle;
  if (type === "all") pageTitle = "All Posts";
  else if (type === "following") pageTitle = "Following Posts";
  else pageTitle = "Liked Posts";

  function handleChange(event) {
    setNewPostContent(event.target.value);
  }

  async function createNewPost() {
    let reponse = await fetch("http://127.0.0.1:8000/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authToken.access),
      },
      body: JSON.stringify({ content: newPostContent }),
    });

    if (reponse.ok) {
      setNewPostContent("");
      handleClose();
      getPosts();
    }
  }

  function handlePageChange(direction) {
    if (direction === "prev")
      setPageController((prevState) => ({
        ...prevState,
        current: prevState.current - 1,
      }));
    else
      setPageController((prevState) => ({
        ...prevState,
        current: prevState.current + 1,
      }));
  }

  const getPosts = useCallback(async () => {
    let response;
    if (type === "all") {
      response = await fetch(
        `http://127.0.0.1:8000/api/posts?page=${pageController.current}`
      );
    } else if (type === "following") {
      response = await fetch(
        `http://127.0.0.1:8000/api/userinfo/${user?.username}/following?page=${pageController.current}`
      );
    } else {
      response = await fetch(
        `http://127.0.0.1:8000/api/userinfo/${user?.username}/liked_posts?page=${pageController.current}`
      );
    }
    let data = await response.json();

    setPageController((prevState) => ({
      ...prevState,
      next: data.next,
      previous: data.previous,
    }));
    setPosts(data.results);
  }, [type, user, pageController.current]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPosts();
  }, [getPosts]);

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
            <button className="btn btn-skyblue" onClick={createNewPost}>
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
          <button className="btn btn-skyblue" onClick={createNewPost}>
            Post
          </button>
        </Modal.Footer>
      </Modal>

      <div className="my-md-5 px-2 px-md-5 posts-container">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      <div className="mb-5 pb-4 px-2 px-md-5 d-flex justify-content-center">
        {pageController.previous && (
          <button
            className="btn btn-skyblue"
            onClick={() => handlePageChange("prev")}
          >
            Previous
          </button>
        )}
        {pageController.next && (
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
