import React, { useContext, useState, memo } from "react";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import useLikePost from "../hooks/useLikePost";
import useEditPost from "../hooks/useEditPost";
import useDeletePost from "../hooks/useDeletePost";

import profileImage from "../images/default_profile_image.png";

const Post = memo(
  ({ post: { id, likes, user: post_author, content, datetime, liked_by } }) => {
    const { user, authToken } = useContext(AuthContext);
    const [likeAlready, setLikeAlready] = useState(
      liked_by.includes(user?.username)
    );
    const [numOflikes, setNumOflikes] = useState(likes);
    const [postContent, setPostContent] = useState(content);
    const [deleted, setDeleted] = useState(false);
    const [edit, setEdit] = useState(false);

    const likePost = useLikePost(id, authToken?.access);
    const editPost = useEditPost(id, postContent, authToken);
    const deletePost = useDeletePost(id, authToken);

    const navigate = useNavigate();

    const handleContentChange = (event) => {
      setPostContent(event.target.value);
    };

    const handleUpdatePost = () => {
      editPost();
      setEdit(false);
    };

    const handleDeletePost = () => {
      deletePost();
      setDeleted(true);
    };

    const handleLike = () => {
      if (!user) {
        navigate("/login");
        return;
      }

      likePost();
      if (!likeAlready) setNumOflikes((prev) => prev + 1);
      else setNumOflikes((prev) => prev - 1);
      setLikeAlready((prev) => !prev);
    };

    return (
      !deleted && (
        <>
          <Card
            id={id}
            className="mb-4 shadow-sm border-0 mx-auto px-xs-5 px-sm-4"
          >
            <Card.Body>
              <Row className="post-header mb-4 g-0">
                <Col xs={1}>
                  <Link
                    to={`/${post_author}/profile`}
                    className="text-dark text-decoratio-none"
                  >
                    <img
                      className="user-icon-img"
                      alt="user-icon"
                      src={profileImage}
                    />
                  </Link>
                </Col>

                <Col xs={8} className="d-flex flex-column ps-5 ps-sm-4 ps-lg-4">
                  <Link
                    to={`/${post_author}/profile`}
                    className="card-title username fw-bolder mb-1"
                  >
                    {post_author}
                  </Link>
                  <p className="post-datetime m-0">
                    {moment(datetime).fromNow()}
                  </p>
                </Col>

                {post_author === user?.username && (
                  <Col xs={3} className="fs-5 text-center">
                    <div className="dropdown dropright">
                      <i
                        className="bi bi-three-dots view-more-button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></i>
                      <ul
                        className="dropdown-menu w-50"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <li>
                          <span
                            className="dropdown-item text-secondary"
                            onClick={() => setEdit(true)}
                          >
                            Edit
                          </span>
                        </li>
                        <li>
                          <span
                            className="dropdown-item text-danger"
                            onClick={handleDeletePost}
                          >
                            Delete
                          </span>
                        </li>
                      </ul>
                    </div>
                  </Col>
                )}
              </Row>

              {!edit ? (
                <Card.Text className=""> {postContent}</Card.Text>
              ) : (
                <div className="edit-post flex-column flex-md-row">
                  <textarea
                    className="edit-content w-75"
                    id={id}
                    name="edit"
                    value={postContent}
                    onChange={handleContentChange}
                  ></textarea>
                  <div className="edit-post-btn-group mt-2">
                    <button
                      type="submit"
                      className="btn border-0"
                      onClick={handleUpdatePost}
                    >
                      <i className="bi bi-check2"></i>
                    </button>
                    <button
                      className="btn border-0"
                      onClick={() => setEdit(false)}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                </div>
              )}

              <Card.Text className="mt-4 pt-2 number-of-likes text-muted">
                {numOflikes} likes
              </Card.Text>
              <hr />

              <div className="post-btn-group">
                <button className="btn border-0 mx-md-5" onClick={handleLike}>
                  <i
                    className={"bi bi-heart" + (likeAlready ? "-fill" : "")}
                  ></i>
                </button>
                <button className="btn border-0 mx-md-5">
                  <i className="bi bi-chat-left-dots"></i>
                </button>
                <button className="btn border-0 mx-md-5">
                  <i className="bi bi-share"></i>
                </button>
              </div>
            </Card.Body>
          </Card>

          <Modal centered>
            <Modal.Header closeButton>
              <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <textarea
                className="w-100 border-0"
                rows="5"
                maxLength="280"
                name="content"
                //value={}
                //placeholder={``}
                //onChange={}
              ></textarea>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  }
);

export default Post;
