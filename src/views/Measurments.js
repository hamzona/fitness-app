import React, { useState } from "react";
import { useGetMeasurmentsQuery } from "../features/auth/authApiSlice";
import {
  Alert,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddMeasurmentCategoryModal from "../components/AddMeasurmentCategoryModal";
const Measurments = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("success");
  const [message, setMessage] = useState("");

  const { data, isSuccess, isLoading, isError, error } =
    useGetMeasurmentsQuery();
  const navigate = useNavigate();
  let content;
  if (isSuccess) {
    console.log(data);
    content = data.results.map((item) => {
      return (
        <ListItem
          key={item.id}
          disablePadding
          onClick={() => {
            navigate(`/measurment/${item.id}`);
          }}
        >
          <ListItemButton>
            <ListItemText primary={item.name} />
            <VisibilityIcon />
          </ListItemButton>
        </ListItem>
      );
    });
  }
  const createSnackbar = ({ message, type }) => {
    setShowSnackbar(true);
    setMessage(message);
    setSnackbarType(type);
  };
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    setMessage("");
    setSnackbarType("success");
  };
  return (
    <Box
      sx={{
        padding: "100px",
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h2">Measurments</Typography>
        <List sx={{ width: "40vw" }}>{content}</List>
      </Box>

      <Button
        sx={{ alignSelf: "end" }}
        variant="contained"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add new measurement +
      </Button>
      <AddMeasurmentCategoryModal
        open={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
        createSnackbar={createSnackbar}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
        open={showSnackbar}
        onClose={handleCloseSnackbar}
        key={"top" + "right" + message}
        severity={snackbarType}
      >
        <Alert severity={snackbarType} elevation={6} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Measurments;
