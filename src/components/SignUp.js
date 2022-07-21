import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
      firstname: yup.string().required("firstname is required"),
      lastname: yup.string().required("lastname is required"),
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
        var response = await axios.post(
          "https://employeecontactmanagement.herokuapp.com/users/signup",
          {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
            phone: values.phone,
          }
        );
        toast.success("successfully registered....");
        console.log(response.data);
        navigate("/login");
      } catch (err) {
        toast.error(err.response.data.msg);
        console.log(err.response.data);
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
          <div className="text">
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
                  type="text"
                  name="firstname"
                  label="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                />

                {formik.errors.firstname ? (
                  <span className="text-warning">
                    {formik.errors.firstname}
                  </span>
                ) : null}
                <br />

                <TextField
                  label="lastname"
                  type="text"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                />

                {formik.errors.lastname ? (
                  <span className="text-warning">{formik.errors.lastname}</span>
                ) : null}
                <br />

                <TextField
                  label="email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <br />
                {formik.errors.email ? (
                  <span className="text-warning">{formik.errors.email}</span>
                ) : null}
                <br />

                <TextField
                  label="password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />

                {formik.errors.password ? (
                  <span className="text-warning">{formik.errors.password}</span>
                ) : null}
                <br />

                <TextField
                  label="confirm_password"
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />

                {formik.errors.confirmPassword ? (
                  <span className="text-warning">
                    {formik.errors.confirmPassword}
                  </span>
                ) : null}
                <br />

                <Button variant="contained" type="submit">
                  Register
                </Button>
              </Box>
              <span>already have an account?</span>
              <Link to="/login">
                <b className="text-warning"> Login </b>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
