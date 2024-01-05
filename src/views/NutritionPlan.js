import React, { Fragment, useState } from "react";
import {
  useDeleteNutritionPlanMutation,
  useGetNutritionPlanQuery,
} from "../features/auth/authApiSlice";
import AddNutritionModal from "../components/AddEditNutritionModal";
import {
  Alert,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const NutritionPlan = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [planToEdit, setPlanToEdit] = useState(null);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("success");
  const [message, setMessage] = useState("");

  const { data, isSuccess, isLoading, isError } = useGetNutritionPlanQuery();

  const handleEdit = (item) => {
    setPlanToEdit(item);
    setIsEditMode(true);
    setIsAddModalOpen(true);
  };

  const [deletePlan] = useDeleteNutritionPlanMutation();
  const handleDelete = async (id) => {
    try {
      const result = await deletePlan(id);
      if (result?.data === null) {
        createSnackbar({
          message: "Successfully deleted nutrition plan",
          type: "success",
        });
      } else {
        createSnackbar({ message: "Something went wrong", type: "error" });
      }

      console.log(result);
    } catch (e) {
      console.log(e);
      createSnackbar({
        message: "Successfully deleted nutrition plan",
        type: "error",
      });
    }
  };

  let content;
  if (isSuccess) {
    content = (
      <List
        sx={{
          width: "100%",
          maxWidth: 500,
          bgcolor: "background.paper",
          margin: "10px",
          borderTop: "1px solid ",
        }}
      >
        {data.results?.map((item) => {
          return (
            <ListItem key={item.id} sx={{}}>
              <ListItemText
                primary={item.description}
                secondary={`${item.goal_energy} kcal fat: ${item.goal_fat} carbohydrates: ${item.goal_carbohydrates} proteins: ${item.goal_protein}`}
              />
              <EditIcon onClick={() => handleEdit(item)} />
              <DeleteIcon onClick={() => handleDelete(item.id)} />
            </ListItem>
          );
        })}
      </List>
    );
  }
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditMode(false);
    setPlanToEdit(null);
  };
  const createSnackbar = ({ message, type }) => {
    setShowSnackbar(true);
    setMessage(message);
    setSnackbarType(type);
  };
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    setMessage("");
    setSnackbarType("");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "30px",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <h1>Nutrition plan</h1>
        {content}
      </Box>

      <Button variant="contained" onClick={() => setIsAddModalOpen(true)}>
        Add nutrition plan +
      </Button>
      <AddNutritionModal
        planToEdit={planToEdit}
        isEditMode={isEditMode}
        open={isAddModalOpen}
        handleClose={handleCloseModal}
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

export default NutritionPlan;
