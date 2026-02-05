import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsByPostId, createComment } from "../actions/commentsActions";

const CommentsSection = ({ postId }) => {
  const dispatch = useDispatch();
  const { commentsList, isLoading, isSaving } = useSelector((state) => state.comments);
  const userId = useSelector(state => state.user?.user?.userId);

  useEffect(() => {
    dispatch(fetchCommentsByPostId(postId));
  }, [postId, dispatch]);

  const handleAddComment = () => {
    const dto = {
      commentContent: "Новий коментар!",
      postId,
      userId,
    };
    dispatch(createComment(dto));
  };

  return (
    <div>
      <h3>Коментарі</h3>
      {isLoading ? <p>Завантаження...</p> : (
        <ul>
          {commentsList.map((c) => (
            <li key={c._id}>{c.commentContent} (від користувача {c.userId})</li>
          ))}
        </ul>
      )}
      <button onClick={handleAddComment} disabled={isSaving}>
        Додати коментар
      </button>
    </div>
  );
};

export default CommentsSection;