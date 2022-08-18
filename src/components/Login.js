import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import loginImage from "../images/0204.png";

import { useFormik } from "formik";
import * as yup from "yup";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("email is required"),
      password: yup
        .string()
        .required("password is required")
        .min(5, "minimum 5 characters is required")
        .max(15, "maximum only 15 characters is allowed"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        var response = await axios.post(
          "https://employeecontactmanagement.herokuapp.com/users/login",
          {
            email: values.email,
            password: values.password,
          }
        );
        console.log(response.data.token);
        if (response.data) {
          await localStorage.setItem("access-token", response.data.token);
          toast.success("loged in successfully....");
          navigate("/contacts");
          // console.log(response.data);
        }
      } catch (err) {
        toast.error(err.response.data.msg);
        // setError(err.response.data.msg);
        // console.log(err.response.data.msg);
      }
    },
  });

  return (
    <>
      <div className="login">
        <div className="container">
          <div>
            <Typography variant="h4" component="div">
              <h1>
                <b>
                  <span className="text-danger"> Login </span>
                  to view the contacts{" "}
                </b>
              </h1>
            </Typography>
            <br /> <br />
            <div className="text">
              <div className="loginform">
                <div className="loginimage">
                  <img
                    src="https://www.getillustrations.com/packs/plastic-illustrations-scene-builder-pack/scenes/_1x/accounts%20_%20man,%20workspace,%20desk,%20laptop,%20login,%20user_md.png"
                    alt="login"
                  />
                </div>

                <div className="loginbody">
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
                      marginTop={5}
                    />
                    <TextField
                      variant="standard"
                      margin="normal"
                      required
                      fullWidth
                      autoFocus
                      type="text"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className="textfeild"
                    />
                    <br />
                    {formik.errors.email ? (
                      <span className="text-danger">{formik.errors.email}</span>
                    ) : null}

                    <br />

                    <TextField
                      label="Password"
                      type="password"
                      name="password"
                      variant="standard"
                      margin="normal"
                      required
                      fullWidth
                      autoFocus
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      sx={{ color: "white" }}
                    />
                    <br />
                    {formik.errors.password ? (
                      <span className="text-danger">
                        {formik.errors.password}
                      </span>
                    ) : null}

                    <br />
                    <Button variant="contained" type="submit">
                      Login
                    </Button>
                    <br />

                    <br />
                    <span> dont have account ?</span>
                    <Link to="/signup">
                      <b className="text-primary"> register </b>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </Grid>
        </Grid> */}
      </div>
    </>
  );
}

export default Login;
