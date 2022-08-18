import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import signup from "../images/signup3.jpg";

function SignUp() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required("firstname is required")
        .min(5, "minimum 5 characters is required")
        .max(15, "maximum only 15 characters is allowed"),
      email: yup.string().email().required("email is required"),
      password: yup
        .string()
        .required("password is required")
        .min(5, "minimum 5 characters is required")
        .max(15, "maximum only 15 characters is allowed"),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref("password"), null],
          "confirmpassword and password must be same "
        )
        .required("confirmpassword is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("hey");
        var response = await axios.post(
          "https://employeecontactmanagement.herokuapp.com/users/signup",
          {
            username: values.username,
            email: values.email,
            password: values.password,
          }
        );
        // setLoading(false);
        toast.success("successfully registered....");
        console.log(response.data);
        navigate("/login");
      } catch (err) {
        toast.error(err.response.data.msg);
        // setError(err.response.data.msg);
      }
    },
  });
  return (
    <div className="signup">
      <div className="container">
        <div>
          <Typography variant="h4" component="div">
            <h1>
              <b>signup</b>
            </h1>
          </Typography>
          <br /> <br />
          <div className="signup__header">
            <div className="image">
              <img src={signup} alt="signup" />
            </div>

            <div className="singupbody">
              <form autoComplete="off" onSubmit={formik.handleSubmit}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent={"center"}
                  maxWidth={400}
                  alignContent={"center"}
                  alignSelf="center"
                  marginLeft={"auto"}
                  marginRight="auto"
                >
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    type="text"
                    name="username"
                    label="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />

                  {formik.errors.username ? (
                    <span className="text-danger">
                      {formik.errors.username}
                    </span>
                  ) : null}
                  <br />

                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    label="email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <br />
                  {formik.errors.email ? (
                    <span className="text-danger">{formik.errors.email}</span>
                  ) : null}
                  <br />

                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    label="password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />

                  {formik.errors.password ? (
                    <span className="text-danger">
                      {formik.errors.password}
                    </span>
                  ) : null}
                  <br />
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    label="confirm_password"
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                  />

                  {formik.errors.confirmPassword ? (
                    <span className="text-danger">
                      {formik.errors.confirmPassword}
                    </span>
                  ) : null}
                  <br />

                  <Button variant="contained" type="submit">
                    Register
                  </Button>
                </Box>

                <br />
                <span>already have an account?</span>
                <Link to="/login">
                  <b className="text-primary"> Login </b>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
