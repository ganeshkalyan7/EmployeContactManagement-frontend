import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { Button } from "@mui/material";

import { Link } from "react-router-dom";

function ViewContacts() {
  const token = localStorage.getItem("access-token");
  const navigate = useNavigate();
  const id = useParams().id;
  const [contact, setContact] = useState({});
  //get by id

  useEffect(() => {
    const getData = async () => {
      try {
        var decodedToken = jwt.decode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          navigate("/login");
        } else {
          var response = await axios.get(
            `https://employeecontactmanagement.herokuapp.com/contact/getid/${id}`,
            {
              headers: {
                "access-token": token,
              },
            }
          );
          // var res = response.data;
          setContact(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [id]);

  //data updation

  return (
    <div>
      <div className="card text-center" id="editcontact">
        <div className="card-header" id="head">
          {" "}
          <h2> Complete Details Of Employee </h2>
        </div>
        <div className="card-body">
          <div style={{ display: "grid", gridTemplateColumns: "30% 70%" }}>
            <div>
              <img
                src={contact.image}
                alt="img"
                id="img"
                className="d-flex justify-content-start"
              />
            </div>
            <div className="sider">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  {" "}
                  <span className="text-danger"> NAME </span>:{" "}
                  <b> {contact.name} </b>
                </li>
                <li className="list-group-item">
                  <span className="text-danger">EMAIL</span>:{" "}
                  <b> {contact.email} </b>
                </li>
                <li className="list-group-item">
                  <span className="text-danger">DESIGNATION </span>:{" "}
                  <b> {contact.designation} </b>
                </li>
                <li className="list-group-item">
                  <span className="text-danger">CONTACT_NUMBER </span>:{" "}
                  <b> {contact.phone} </b>
                </li>
                <li className="list-group-item">
                  <span className="text-danger">COMPANY </span>:{" "}
                  <b> {contact.company} </b>
                </li>
                <li className="list-group-item">
                  <span className="text-danger">ADDRESS </span>:{" "}
                  <b> {contact.address} </b>
                </li>
                <li className="list-group-item">
                  <span className="text-danger"> EXPERIANCE </span>:{" "}
                  <b> {contact.experiance} </b>
                </li>
                <li className="list-group-item">
                  <span className="text-danger"> DATE OF BIRTH </span>:{" "}
                  <b> {contact.DateOfBirth} </b>
                </li>
              </ul>
            </div>
          </div>
          <Button variant="contained">
            <Link
              to="/contacts"
              style={({ textDecoration: "none" }, { color: "white" })}
            >
              Back
            </Link>
          </Button>

          {/* <a href="#" className="btn btn-primary">
          
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default ViewContacts;
