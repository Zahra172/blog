import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/material/styles";
const Input = styled("input")({
  display: "none",
});
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FloatingButton from "./FloatingButton";

export default function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData,
          {
            params: {
              key: "e9d746005cef9039ce2d548f67bc217a",
            },
          }
        );

        const imageUrl = res.data.data.url;
        setPost((prev) => ({
          ...prev,
          image: imageUrl,
          imageName: file.name,
        }));
      } catch (err) {
        console.error("Image upload failed", err);
      }
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    axios.put(`http://localhost:3000/posts/${id}`, post).then(() => {
      toast.success("Post updated successfully!", {
        className: "custom-toast",
      });

      // navigate("/profile");
    });
  }

  return (
    <>
      <Container maxWidth="sm">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          theme="colored"
        />
        <Paper
          elevation={4}
          sx={{
            mt: 8,
            p: 4,
            borderRadius: 4,
            background: "#f9f5ff",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            component="form"
            onSubmit={handleSubmit}
          >
            <Avatar sx={{ bgcolor: "black", width: 56, height: 56 }}>
              <AddPhotoAlternateIcon />
            </Avatar>

            <Typography variant="h5" fontWeight="bold" color="black">
              Edit Post
            </Typography>

            <TextField
              fullWidth
              label="Post Title"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Author"
              name="author"
              disabled
              value={post.author}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={post.description}
              onChange={handleChange}
              required
            />

            <label htmlFor="upload-image">
              <Input
                accept="image/*"
                id="upload-image"
                type="file"
                onChange={handleImageChange}
              />
              <Button
                variant="outlined"
                component="span"
                fullWidth
                sx={{
                  borderColor: "black",
                  color: "#4b006e",
                  "&:hover": {
                    backgroundColor: "#f3e8ff",
                    borderColor: "#a855f7",
                  },
                }}
              >
                {post.imageName ? post.imageName : "Upload Image"}
              </Button>
            </label>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "black",
                color: "white",
                mt: 2,
                "&:hover": { backgroundColor: "#262626" },
              }}
            >
              Submit Post
            </Button>
          </Box>
        </Paper>
        <FloatingButton/>
      </Container>
    </>
  );
}
