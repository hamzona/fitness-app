import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ButtonAppBar() {
  const token = useSelector((state) => state.auth.accessToken);
  console.log(token);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
           </IconButton>  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "50%",
            }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link className="link" to={"/nutritionPlan"}>
                Nutrition plan
              </Link>
            </Typography>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link className="link" to={"/ingredientOverview"}>
                Ingredient overview
              </Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link className="link" to={"/measurment"}>
                Measurment
              </Link>
            </Typography>
          </Box>
          {!token ? (
            <>
              <Link className="link" to={"/login"}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link className="link" to={"/register"}>
                <Button color="inherit">Register</Button>
              </Link>
            </>
          ) : (
            <Link className="link" to={"/myAccount"}>
              <Button color="inherit">My account</Button>
            </Link>
          )}{" "}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
