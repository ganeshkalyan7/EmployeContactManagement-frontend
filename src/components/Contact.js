import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailLockIcon from "@mui/icons-material/MailLock";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

function Contact() {
  const token = localStorage.getItem("access-token");
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  //get contacts
  const getData = async () => {
    try {
      var decodedToken = jwt.decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        navigate("/login");
      } else {
        var response = await axios.get(
          "https://employeecontactmanagement.herokuapp.com/contact",
          {
            headers: {
              "access-token": token,
            },
          }
        );
        var res = response.data;

        setUser(res);
      }
      // console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  //delete contacts
  const deleteContact = async (id) => {
    try {
      var decodedToken = jwt.decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        navigate("/login");
      } else {
        await axios.delete(
          `https://employeecontactmanagement.herokuapp.com/contact/delete/${id}`,
          {
            headers: {
              "access-token": token,
            },
          }
        );
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  //logout
  const logout = async () => {
    await localStorage.removeItem("access-token");
    navigate("/");
  };

  return (
    <div className="contact">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="d-flex justify-content-center">
            <h1 className="container-fluid">
              <b className="text"> CONTACT FORM </b>
            </h1>
          </div>

          <div className="d-flex justify-content-start">
            <Link to="/addcontacts" style={{ textDecoration: "none" }}>
              {/* <button type="button" className="btn btn-danger">
                <h5>ADD CONTACTS </h5>
              </button> */}
              <Button variant="contained" color="success">
                <h5>ADD CONTACTS </h5>
              </Button>
            </Link>
            &nbsp; &nbsp; &nbsp;
            <Button variant="contained" color="error" onClick={logout}>
              <h5>LogOut </h5>
            </Button>
          </div>
        </div>
      </nav>
      <br />
      <div>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {user.map((val) => (
            <Grid item xs={2} sm={4} md={4} key={val._id}>
              <div>
                <Card sx={{ maxWidth: 345 }} className="cards">
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="100"
                    image={val.image}
                    className="imagecard"
                  />
                  <CardContent className="cardContent">
                    <Typography gutterBottom variant="h5" component="div">
                      <AccountCircleIcon sx={{ fontSize: 50 }} />{" "}
                      <b> {val.name} </b>
                    </Typography>

                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        <MailLockIcon sx={{ fontSize: 50 }} />:{" "}
                        <b> {val.email} </b>
                      </Typography>

                      <Typography gutterBottom variant="h6" component="div">
                        <PhoneIphoneIcon sx={{ fontSize: 50 }} />
                        <b> {val.phone} </b>
                      </Typography>
                    </CardContent>
                  </CardContent>
                  <CardActions>
                    <Link
                      to={`/ViewContacts/${val._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        size="medium"
                        variant="contained"
                        className="cardButton"
                      >
                        Viwe_Contact
                      </Button>
                    </Link>
                    &nbsp; &nbsp; &nbsp;
                    <Button
                      size="medium"
                      color="error"
                      variant="contained"
                      onClick={() => deleteContact(val._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Contact;
