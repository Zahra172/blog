import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import svg404 from "../assets/images/404-error.png";
export default function Notfound() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Box
        component="img"
        src={svg404}
        alt="404 Not Found"
        sx={{
          maxWidth: "100%",
          height: "auto",
          mb: 4,
        }}
      />

      <Button
        variant="text"
        color="black"
        href="/home"
        sx={{fontSize:"30px" ,textDecoration:"underline" }}
      >
        went to home page
      </Button>
    </Container>
  );
}
