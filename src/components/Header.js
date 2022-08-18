import React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

function Header() {
  return (
    <div className="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <b> EMPLOYESS CONTACT MANAGEMENT </b>
            </Typography>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button sx={{ color: "white" }} variant="outlined">
                <h5>
                  <b> Login </b>
                </h5>
              </Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button color="inherit" sx={{ color: "white" }}>
                <h5>
                  <b> Register </b>
                </h5>
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header;
