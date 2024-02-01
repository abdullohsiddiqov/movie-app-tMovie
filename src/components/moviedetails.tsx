import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MovieDetails, LikesCount, isComments } from "../utils/types";
import "../assets/styles/moviedetails.css";

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [likesCount, setLikesCount] = useState<number | null>(null);
  const [comments, setComments] = useState<isComments[] | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get<{ movie: MovieDetails }>(
        `http://localhost:4000/api/movies/${id}`
      );
      setMovieDetails(response.data.movie);
      await fetchLikesCount();
      await fetchComments();
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikesCount = async () => {
    try {
      const response = await axios.get<LikesCount>(
        `http://localhost:4000/api/likes_count/${id}`
      );
      setLikesCount(response.data.likesCount);
    } catch (error) {
      console.error("Error fetching likes count:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/comments/${id}`);
      setComments(response.data.comments);
      console.log(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const handleLikeClick = async () => {
    try {
      await axios.post(`http://localhost:4000/api/like_movie/${id}`);
      fetchLikesCount();
    } catch (error) {
      console.error("Error liking movie:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      await axios.post<isComments>(
        `http://localhost:4000/api/comment_movie/${id}`,
        { comment: newComment }
      );
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      {loading && (
        <div>
          <p>Loading...</p>
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      )}
      {movieDetails && (
        <div className="main-container">
          <div className="container">
            <div className="main-box">
              <div
                className="image"
                style={{ backgroundImage: `url(${movieDetails.images})` }}
              ></div>
              <div className="titlesbox">
                <div className="box1">
                  <h3>Заголовок:</h3>
                  <p>{movieDetails.title}</p>
                </div>
                <div className="box2">
                  <h3>Год:</h3>
                  <p>{movieDetails.year}</p>
                </div>
                <div className="box1">
                  <h3>Страна:</h3>
                  <p>{movieDetails.country}</p>
                </div>
                <div className="box2">
                  <h3>Жанр:</h3>
                  <p>{movieDetails.genre}</p>
                </div>
                <div className="box1">
                  <h3>Длительность фильма:</h3>
                  <p>{movieDetails.runtime}</p>
                </div>
              </div>
            </div>
            <div className="main-box2">
              <h3 className="text">Описание:</h3>
              <p className="text2">{movieDetails.description}</p>
            </div>
            <h3 className="video-text">Смотреть онлайн</h3>
            <video src={movieDetails.videoLink} className="video1" controls></video>
            <div className="flex4">
              <div className="like" onClick={handleLikeClick}>
                Like
              </div>
              <div className="likesCount">{likesCount}</div>
            </div>
            <input
              type="text"
              className="comments"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="add-comment" onClick={handleAddComment}>
              Add Comment
            </button>
            <div className="all-comments">
              {comments &&
                comments.map((comment, index) => {
                  console.log(comment);
                  return <div key={index}>{comment.comment}</div>;
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
