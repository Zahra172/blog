import React, { useContext, useState } from "react";
// import { Supabase} from "../../supabaseClient";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function SignUp() {
  let navigate = useNavigate(); // to navigate another page
  let [errorMessage, setErrorMessage] = useState(""); // for declear error message
  let { setUserLogin } = useContext(UserContext);
  let validationSchema = Yup.object().shape({
    // how to use yup
    name: Yup.string()
      .min(3, "name mus be more than 3 char")
      .max(10, "name must be less than 10 char")
      .required("name is required"),
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-z][a-z0-9]{5,10}$/, "password must start with upperLeter")
      .min(6, "password must be at least 6 char")
      .required("password is required"),
  });

  // const userInfo = JSON.parse(localStorage.getItem("userInfo")) || []; //for ckeck local storage

  function handleSubmit(values) {
    axios
      .post("http://localhost:3000/register", values)
      .then((apiResponse) => {
        console.log(apiResponse);
        if (apiResponse?.statusText === "Created") {
          // localStorage.setItem("userToken", apiResponse.data.accessToken);
          // setUserLogin(apiResponse.data.accessToken);
          localStorage.setItem("user", JSON.stringify(values));

          navigate("/login");
        }
      })
      .catch((apiResponse) => {
        console.log(apiResponse);
        setErrorMessage("email is already exist");
      });
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="name"
            />
            {/* alert for errors */}
            {formik.errors.name && formik.touched.name ? (
              <Alert severity="error">{formik.errors.name}</Alert>
            ) : null}

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              autoComplete="email"
            />
            {/* alert for errors */}
            {formik.errors.email && formik.touched.email ? (
              <Alert severity="error">{formik.errors.email}</Alert>
            ) : null}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="new-password"
            />
            {formik.errors.password && formik.touched.password ? (
              <Alert severity="error">{formik.errors.password}</Alert>
            ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 3,
                backgroundColor: "black ",
                color: "white",
                "&:hover": { color: "#c084fc" },
              }}
            >
              Sign Up
            </Button>
            {errorMessage ? (
              <Alert severity="error">{errorMessage}</Alert>
            ) : null}

            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant="" sx={{ mt: 1 }}>
                  Already have an account?{" "}
                  <Box
                    sx={{
                      fontWeight: "700",
                      display: "inline",
                      "&:hover": {
                        color: "#c084fc",
                      },
                      textDecoration: "none",
                    }}
                  >
                    <NavLink to="/login" style={{ color: "black" }}>
                      Login
                    </NavLink>
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignUp;
