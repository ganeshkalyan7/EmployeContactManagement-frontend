import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import jwt from "jsonwebtoken";
import "./AddContact.css";

import loginImage from "../images/login.jpg";

function AddContacts() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("access-token");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      designation: "",
      image: "",
      address: "",
      experiance: "",
      DateOfBirth: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("name is required")
        .min(3, "  minimum 3 characters is required"),
      email: yup.string().email().required("email must be included "),
      phone: yup
        .string()
        .required("mobile number is required")
        .max(10, "enter a valid mobile number"),
      company: yup.string().required("company name is requird!!!"),
      image: yup.string().required("image url is requird"),
      designation: yup.string().required("mention your role "),
      address: yup.string().required("address is required"),
      experiance: yup.string().required("experiance required"),
      DateOfBirth: yup.string().required("date of birth required"),
    }),
    onSubmit: async (values) => {
      var decodedToken = jwt.decode(token);
      //   console.log(decodedToken);
      console.log(decodedToken);
      try {
        if (decodedToken.exp * 1000 < Date.now()) {
          navigate("/login");
        } else {
          var response = await axios.post(
            "https://employeecontactmanagement.herokuapp.com/contact/create",
            {
              name: values.name,
              email: values.email,
              phone: values.phone,
              company: values.company,
              image: values.image,
              designation: values.designation,
              address: values.address,
              experiance: values.experiance,
              DateOfBirth: values.DateOfBirth,
            },
            {
              headers: {
                "access-token": token,
              },
            }
          );
          console.log(response.data);
          setUser(response.data);
          navigate("/contacts");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div className="content">
      <h1 className="text-dark" id="add">
        {" "}
        addcontacts
      </h1>

      <div className="addcontactmain">
        <div className="addcontact">{/* <img src={loginImage} /> */}</div>
        <div className="addcontactinfo">
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent={"center"}
              maxWidth={800}
              alignContent={"center"}
              alignSelf="center"
              marginLeft={"auto"}
              marginRight="auto"
            >
              <div className="formbody">
                <div>
                  <TextField
                    // variant="standard"
                    // margin="normal"
                    // required
                    fullWidth
                    autoFocus
                    type="text"
                    name="name"
                    label="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name ? (
                    <span className="text-danger"> {formik.errors.name}</span>
                  ) : null}
                </div>
                <br />

                <div>
                  <TextField
                    // variant="standard"
                    // margin="normal"
                    // required
                    fullWidth
                    autoFocus
                    type="email"
                    name="email"
                    label="email"
                    sx={{ color: "GrayText" }}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email ? (
                    <span className="text-danger"> {formik.errors.email}</span>
                  ) : null}
                </div>
                <br />
                <div>
                  <TextField
                    // variant="standard"
                    // margin="normal"
                    // required
                    fullWidth
                    autoFocus
                    type="number"
                    name="phone"
                    label="phone"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phone ? (
                    <span className="text-danger"> {formik.errors.phone}</span>
                  ) : null}
                </div>
                <br />
                <div>
                  <TextField
                    // variant="standard"
                    // margin="normal"
                    // required
                    fullWidth
                    autoFocus
                    type="text"
                    name="company"
                    label="company"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.company ? (
                    <span className="text-danger">
                      {" "}
                      {formik.errors.company}
                    </span>
                  ) : null}
                </div>
                <br />
                <div>
                  <TextField
                    // variant="standard"
                    // margin="normal"
                    // required
                    fullWidth
                    autoFocus
                    name="designation"
                    type="text"
                    label="designation"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.designation ? (
                    <span className="text-danger">
                      {" "}
                      {formik.errors.designation}
                    </span>
                  ) : null}
                </div>
                <br />
                <div>
                  <TextField
                    // variant="standard"
                    // margin="normal"
                    // required
                    fullWidth
                    autoFocus
                    name="image"
                    type="text"
                    label="Image_Url"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.image ? (
                    <span className="text-danger"> {formik.errors.image}</span>
                  ) : null}
                </div>
                <br />
                <div>
                  <TextField
                    // variant="standard"
                    // margin="normal"
                    // required
                    fullWidth
                    autoFocus
                    name="address"
                    label="address"
                    type="text"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.address ? (
                    <span className="text-danger">
                      {" "}
                      {formik.errors.address}
                    </span>
                  ) : null}
                </div>
                <br />
                <div>
                  <TextField
                    // variant="standard"
                    // margin="normal"
                    // required
                    fullWidth
                    autoFocus
                    name="experiance"
                    label="experiance"
                    type="text"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.experiance ? (
                    <span className="text-danger">
                      {" "}
                      {formik.errors.experiance}
                    </span>
                  ) : null}
                </div>
                <br />
                <div>
                  <TextField
                    // variant="standard"
                    // margin="normal"
                    // required
                    fullWidth
                    autoFocus
                    name="DateOfBirth"
                    label="DateOfBirth"
                    type="text"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.DateOfBirth ? (
                    <span className="text-danger">
                      {" "}
                      {formik.errors.DateOfBirth}
                    </span>
                  ) : null}
                </div>
                <Button variant="contained" type="submit">
                  submit
                </Button>
              </div>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddContacts;
