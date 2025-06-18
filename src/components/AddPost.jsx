import React, {  useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Avatar,
  Snackbar,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Input = styled("input")({
  display: "none",
});

function AddPost() {
  const [loading, setLoading] = useState(false); //for loading feedback
  const token = localStorage.getItem("userToken");
  const users = JSON.parse(localStorage.getItem('user'));
  const payload = JSON.parse(atob(token.split(".")[1]));
  const userId = payload.sub;
  const [post, setPost] = useState({
    title: "",
    description: "",
    author: "",
    image: null,
    imageName: "",
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setLoading(true); // Start loading


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
      }finally {
      setLoading(false); // End loading
    }

    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      ...post,
      author: users.email.split("@")[0],
      date: new Date().toLocaleDateString(), // to set date
      userId,
    };
    console.log("Post Submitted:", postData);

    axios
      .post("http://localhost:3000/posts", postData, {
        headers: {
          Authorization: `this is user token from local srorage ${token}`,
        },
      })
      .then((apiResponse) => {
        console.log(apiResponse);
        toast.success("Post added successfully!", {
          className: "custom-toast",
        });
        setPost({
          title: "",
          description: "",
          author: "",
          image: null,
          imageName: "",
        });
      })
      .catch((apiResponse) => {
        console.log(apiResponse);
      });
  };



  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <Container maxWidth="sm">
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
              Add New Post
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
              value={users.email.split('@')[0]}
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
                disabled={loading}
              >
                 {loading ? <CircularProgress size={24} /> : post.imageName || "Upload Image"}
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
              disabled={loading}
            >
              Submit Post
            </Button>
          </Box>
        </Paper>
        
      </Container>
    </>
  );
}

export default AddPost;
