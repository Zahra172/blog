import axios from "axios";
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import { useEffect } from "react";

export default function AddComment({ post }) {
  const users = JSON.parse(localStorage.getItem("user")); //to know witch user

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]); //for add comment

  useEffect(() => {
    setComments(post.comments || []);
  }, [post]);

  const handleComment = () => {
    const newComment = {
      userName: users.email.split("@")[0] || "User",
      text: commentText,
    };
    // let updateComments =[...comments]
    axios
      .put(`http://localhost:3000/posts/${post.id}`, {
        ...post,
        comments: newComment,
      })
      .then((apiResponse) => {
        console.log(apiResponse.data);
        setCommentText("");
        setComments((prev) => [...prev, newComment]);
      })
      .catch((apiResponse) => {
        console.log("error is :", apiResponse);
      });
  };

  return (
    <>
      <Box>
        {comments?.length > 0 ? (
          comments.map((comment, index) => (
            <Box key={index} sx={{ p: 1, borderBottom: "1px solid #ccc" }}>
              <Typography sx={{ fontWeight: "bold" }} variant="subtitle2">
                {comment.userName}
              </Typography>
              <Typography variant="body2">{comment.text}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No comments yet.
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{
            width: "80%",
            height: "20px",
          }}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></TextField>
        <Button
          sx={{ background: "black" }}
          variant="contained"
          onClick={handleComment}
        >
          send
        </Button>
      </Box>
    </>
  );
}
