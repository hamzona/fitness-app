import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Box } from "@mui/joy";
const Layout = () => {
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
