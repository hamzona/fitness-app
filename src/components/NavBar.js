import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";
import Fade from "@mui/material/Fade";

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.accessToken);
  console.log(token);
  console.log(window.innerWidth);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <MenuIcon
            sx={{ display: window.innerWidth < 500 ? "block" : "none" }}
            onClick={handleClick}
          />
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem
              onClick={() => {
                navigate("/nutritionPlan");
                handleClose();
              }}
            >
              {" "}
              Nutrition plan
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/ingredientOverview");
                handleClose();
              }}
            >
              {" "}
              Ingredient overview
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/measurment");
                handleClose();
              }}
            >
              {" "}
              Measurment
            </MenuItem>
          </Menu>
          <Box
            sx={{
              display: window.innerWidth >= 500 ? "flex" : "none",
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
