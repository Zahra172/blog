import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  IconButton,
  CardHeader,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FloatingButton from "./FloatingButton";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("userToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.email?.split("@")[0] || "User";
  const userId = JSON.parse(atob(token.split(".")[1])).sub;

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        const userPosts = res.data.filter((post) => post.userId === userId);
        setPosts(userPosts);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  let [deletedPost, setDeletedPost] = useState(false); //for confirm deleted post
  let [postIdDelete ,setPostIdDelete] =useState(null) // to store post id

  const handleOpen = (id) => {
    setDeletedPost(true);
    setPostIdDelete(id);
  };

  const handleClose = () => setDeletedPost(false);
  function deletePost(postId) {
    axios
      .delete(`http://localhost:3000/posts/${postId}`)
      .then(() => {
        const updated = posts.filter((post) => post.id !== postId);
        setPosts(updated);
        setDeletedPost(false);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdate(id) {
    navigate(`/editPost/${id}`);
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
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
        Profile
      </Typography>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {/* Sidebar */}
        <Box
          sx={{
            flex: "1 1 250px",
            maxWidth: "300px",
            minWidth: "250px",
            background: "#ede9fe",
            borderRadius: 4,
            p: 3,
            textAlign: "center",
            height: "50vh",
          }}
        >
          <Avatar
            alt={userName}
            src={`https://i.pravatar.cc/150?u=${userName}`}
            sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
          />
          <Typography variant="h6" fontWeight="bold">
            Welcome, {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here are your latest blog posts
          </Typography>
        </Box>

        {/* Posts Section */}
        <Box
          sx={{
            flex: "3 1 0",
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: {
              xs: "center",
              md: "flex-start",
            },
          }}
        >
          {posts.length === 0 ? (
            <Typography variant="body1">
              No posts found for this user.
            </Typography>
          ) : (
            posts.map((post) => (
              <Card
                key={post.id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 12px)",
                    md: "calc(50% - 16px)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  boxShadow: 4,
                  backgroundColor: "#ffffff",
                }}
              >
                <CardMedia
                  component="img"
                  image={post.image}
                  alt="Post Image"
                  sx={{ height: 220, objectFit: "cover" }}
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

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" fontWeight="bold">
                    {post.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {post.description?.split(" ").slice(0, 20).join(" ")}...
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => navigate(`/postDetails/${post.id}`)}
                      sx={{
                        ml: 1,
                        textTransform: "none",
                        p: 0,
                        minWidth: "fit-content",
                      }}
                    >
                      See more
                    </Button>
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <IconButton
                    onClick={() => handleUpdate(post.id)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  {/* onClick={() => deletePost(post.id)} */}
                  <IconButton onClick={ ()=> handleOpen(post.id) }  color="error">
                    <DeleteIcon />
                  </IconButton>
                  <Dialog open={deletedPost} onClose={handleClose}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                      <Typography>Are you sure you want to delete post?</Typography>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="inherit">
                        Cancel
                      </Button>
                      <Button onClick={() => deletePost(postIdDelete)} color="error">
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </CardActions>
              </Card>
            ))
          )}
        </Box>
      </Box>

      <FloatingButton />
    </Container>
  );
}
