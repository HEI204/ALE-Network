import React, { useContext, useState, memo } from "react";
import { useMutation, queryClient, useQueryClient } from "react-query";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLikePost, useEditPost } from "../hooks/usePost";

const Post = ({
  post: { id, likes, user: post_author, content, datetime, liked_by },
}) => {
  const { user, authToken } = useContext(AuthContext);
  const [likeAlready, setLikeAlready] = useState(
    liked_by.includes(user?.username)
  );
  const [postContent, setPostContent] = useState(content);
  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();

  const { mutate: like } = useLikePost(id, authToken);
  const { mutate: editPost } = useEditPost(id, authToken);

  const handleContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleUpdatePost = () => {
    editPost();
    setEdit(false);
  };

  const handleLike = () => {
    if (!user) navigate("/login");
    like();
    setLikeAlready((prev) => !prev);
  };

  return (
    <Card id={id} className="mb-4 shadow-sm border-0 mx-auto px-xs-5 px-sm-4">
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
                src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
              />
            </Link>
          </Col>

          <Col xs={10} className="d-flex flex-column ps-5 ps-sm-4 ps-lg-4">
            <Link
              to={`/${post_author}/profile`}
              className="card-title text-decoration-none text-dark username fw-bolder mb-1"
            >
              {post_author}
            </Link>
            <p className="post-datetime m-0">{moment(datetime).fromNow()}</p>
          </Col>

          {post_author === user?.username && (
            <Col xs={1} className="edit_post align-self-start">
              <i className="bi bi-pencil" onClick={() => setEdit(true)}></i>
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
              <button className="btn border-0" onClick={() => setEdit(false)}>
                <i className="bi bi-x"></i>
              </button>
            </div>
          </div>
        )}

        <Card.Text className="mt-4 pt-2 number-of-likes text-muted">
          {likes} likes
        </Card.Text>
        <hr />

        <div className="post-btn-group">
          <button className="btn border-0 mx-md-5" onClick={handleLike}>
            <i className={"bi bi-heart" + (likeAlready ? "-fill" : "")}></i>
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
  );
};

export default Post;
