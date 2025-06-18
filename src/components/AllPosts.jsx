import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Typography,
  CircularProgress,
  Box,
  Button,
  IconButton,
  DialogContent,
  DialogActions,
  DialogContentText,
  Dialog,
  DialogTitle,
  TextField,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddComment from "./AddComment";

export default function AllPosts() {
  let navigate = useNavigate();
  let [posts, setPosts] = useState([]);
  let [loading, setLoading] = useState(true);
  let users = JSON.parse(localStorage.getItem("user"));
  const [openPostId, setOpenPstId] = useState(null); //for show comment dialog

  const handleClickOpen = (postId) => {
    setOpenPstId(postId);
  };
  const handleClose = () => {
    setOpenPstId(null);
  };
  function getAllPosts() {
    axios
      .get("http://localhost:3000/posts")
      .then((apiResponse) => {
        setPosts(apiResponse.data);
        setLoading(false);
      })
      .catch((apiResponse) => {
        console.log(apiResponse);
        setLoading(false);
      });
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Container sx={{ mt: 4, width: "100%" }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        sx={{
          mb: 4,
          color: "#333",
          letterSpacing: 1,

          display: "inline-block",
          px: 2,
        }}
      >
        Blog Posts
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
          }}
        >
          {posts.map((post) => (
            <Box
              key={post.id}
              sx={{
                width: {
                  xs: "100%",
                  sm: "90%",
                  md: "70%",
                },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card
                sx={{
                  mb: 5,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 4,
                  backgroundColor: "#fff",
                }}
              >
                <CardMedia
                  component="img"
                  image={post.image}
                  alt="Post"
                  sx={{
                    height: 250,
                    objectFit: "cover",
                  }}
                />

                <CardHeader
                  avatar={
                    <Avatar
                      src={`https://i.pravatar.cc/150?u=${post.author}`}
                    />
                  }
                  title={
                    <Typography variant="subtitle1" fontWeight="bold">
                      {post.author}
                    </Typography>
                  }
                  subheader={post.date}
                />

                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {post.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {post.description?.split(" ").slice(0, 20).join(" ")}...
                    <Button
                      onClick={() => navigate(`/postDetails/${post.id}`)}
                      size="small"
                      variant="text"
                      sx={{
                        textTransform: "none",
                        fontSize: "0.85rem",
                        ml: 1,
                        p: 0,
                        minWidth: "fit-content",
                      }}
                    >
                      See more
                    </Button>
                  </Typography>

                  {/* reactions */}
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    

                    <IconButton
                      aria-label="add comment"
                      color="primary"
                      onClick={() => handleClickOpen(post.id)}
                    >
                      <MapsUgcIcon sx={{ color: "gray" }} />
                    </IconButton>

                    <Dialog
                      open={openPostId === post.id}
                      onClose={handleClose}
                      fullWidth
                      maxWidth="sm"
                    >
                      <DialogTitle>Comments</DialogTitle>
                      <DialogContent>
                        <AddComment post={post} />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>

                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}
