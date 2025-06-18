import axios from "axios";
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import { useEffect } from "react";

export default function AddComment({ post }) {
  const users = JSON.parse(localStorage.getItem("user")); //to know witch user

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []); //for add comment
  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${post.id}`)
      .then((res) => {
        setComments(res.data.comments || []);
      })
      .catch((err) => {
        console.log("Error fetching comments:", err);
      });
  }, [post]);

  const handleComment = () => {
    if (commentText.trim() !== "") {
      const commentObj = {
        userName: users.email.split("@")[0] || "User",
        text: commentText,
      };

      const updateComments = [...comments, commentObj];
      axios
        .put(`http://localhost:3000/posts/${post.id}`, {
          ...post,
          comments: updateComments,
        })
        .then((apiResponse) => {
          console.log(apiResponse.data);
          setComments(updateComments);
          setCommentText("");
        })
        .catch((apiResponse) => {
          console.log("error is :", apiResponse);
        });
    }
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
