import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Avatar,
  Box,
  CircularProgress,
  Divider,
 IconButton,

} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FloatingButton from "./FloatingButton";


export default function PostDetails() {
  let navigate =useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!post) {
    return (
      
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Box
        component="img"
        src={post.image}
        alt="Post"
        sx={{
          width: "100%",
          height: { xs: 200, sm: 300, md: 400 },
          objectFit: "cover",
          borderRadius: 2,
          mb: 4,
        }}
      />

      
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar
          src={`https://i.pravatar.cc/150?u=${post.author}`}
          sx={{ width: 50, height: 50, mr: 2 }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {post.author}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {post.date}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      
      <Typography variant="h4" gutterBottom fontWeight="bold">
        {post.title}
      </Typography>

      <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8 }}>
        {post.description || "No description available"}
      </Typography>
      <FloatingButton/>
    </Container>
  );
}
