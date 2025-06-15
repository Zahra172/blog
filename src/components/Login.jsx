import React, { useContext, useState } from "react";
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
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../context/UserContext";


function Login() {
  let {setUserLogin} = useContext(UserContext);
  let [errorMessage, setErrorMessage] = useState(""); // for declear error message
  // let [logged , setLogged] = useState(false);
  let navigate = useNavigate();
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-z][a-z0-9]{5,10}$/, "password must start with upperLeter")
      .min(6, "password must be at least 6 char")
      .required("password is required"),
  });
  

  function handleSubmit(values) {
    axios
      .post("http://localhost:3000/login", values)
      .then((apiResponse) => {
        if(apiResponse?.statusText){
          localStorage.setItem('userToken' ,apiResponse.data.accessToken );
          setUserLogin(apiResponse.data.accessToken);
          localStorage.setItem("user", JSON.stringify(values));
          navigate("/home");
        }
      })
      .catch((apiResponse) => {
        console.log(apiResponse);
        setErrorMessage("Invalid email or password. If you’re new, please register.");
      });
  }
  let formik = useFormik({
    initialValues: {
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
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Login
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
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="email"
            />
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
              Login
            </Button>
            {errorMessage ? (
              <Alert severity="error">{errorMessage}</Alert>
            ) : null}
            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant="" sx={{ mt: 1 }}>
                  Don't have an account?{" "}
                  <Typography
                    sx={{
                      fontWeight: "700",
                      display: "inline",
                      "&:hover": {
                        color: "#c084fc",
                      },
                      textDecoration: "none",
                    }}
                  >
                    <NavLink to="/register" style={{ color: "black" }}>
                      Register
                    </NavLink>
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
