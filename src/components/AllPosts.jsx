import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Box,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AllPosts() {
    let navigate = useNavigate();
  let [posts, setPosts] = useState([]);
  let users = JSON.parse(localStorage.getItem("user"));
  function getAllPosts() {
    axios
      .get("http://localhost:3000/posts")
      .then((apiResponse) => {
        console.log(apiResponse);
        setPosts(apiResponse.data);
      })
      .catch((apiResponse) => {
        console.log(apiResponse);
      });
  }
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <Container sx={{ mt: 4, width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          alignItems: "flex-start", 
        }}
      >
        {posts.map((post) => (
          <Box
            key={post.id}
            sx={{
              width: {
                xs: "100%",
                md: "calc(33.33% - 24px)",
              },
              display: "flex",
              flexDirection: "column",
            }}
          >
            
            <Card
            
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "#fff",
                padding:"30px 0 0 0"
              }}
            >
                <CardHeader
                avatar={
                  <Avatar src={`https://i.pravatar.cc/150?u=${post.author}`} />
                }
                title={
                  <Typography variant="subtitle1" fontWeight="bold">
                    {post.author}
                  </Typography>
                }
                
                sx={{ pt: 0, mt: -2 }}
              />
              <CardMedia
                component="img"
                image={post.image}
                alt="Post"
                sx={{ height: 200, objectFit: "cover" }}
              />

              <CardContent sx={{ flexGrow: 1 }}>

                
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

                {/* Author + Date */}
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 2, color: "#333", fontWeight: 500 }}
                >
                  By <b>{post.author}</b> • {post.date}
                </Typography>
              </CardContent>

              
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
