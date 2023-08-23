import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { getToken } from "../services/localStorageService";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
// import Dashboard from "./pages/Dashboard";

export default function Navbar() {
  const accessToken = useSelector((state)=>state.userAuthToken.accessToken)
  const {access_token} = getToken();
  // console.log(accessToken);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Authentication Front-end
          </Typography>

          <Button
            component={NavLink}
            to="/"
            style={({ isActive }) => {
              return { backgroundColor: isActive ? "cyan" : "" };
            }}
            sx={{ textTransform: "none", fontWeight: "bold" }}
            color="inherit"
          >
            Home
          </Button>


          <Button
            component={NavLink}
            to="/contact"
            sx={{ textTransform: "none", fontWeight: "bold", mx: "40px" }}
            color="inherit"
            style={({ isActive }) => {
              return { backgroundColor: isActive ? "cyan" : "" };
            }}

          >
            Contact
          </Button>

          {
            (accessToken || access_token) ?
              <Button
                component={NavLink}
                to="/dashboard"
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? "cyan" : "" };
                }}
                sx={{ textTransform: "none", fontWeight: "bold", ml: "40px" }}
                color="inherit"

              >
                Dashboard
              </Button>
              : 
              <Button
                component={NavLink}
                to="/auth"
                sx={{ textTransform: "none", fontWeight: "bold" }}
                color="inherit"
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? "cyan" : "" };
                }}
              >
                Login/Registration
              </Button>

          }


        </Toolbar>
      </AppBar>
    </Box>
  );
}
