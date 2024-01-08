import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAddMeasurmentCategoryMutation } from "../features/auth/authApiSlice";

const AddMeasurmentCategoryModal = ({ open, handleClose, createSnackbar }) => {
  const textFieldWidth = {
    width: "60%",
    marginTop: "20px",
  };

  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");

  const [addMeasurmentCategory] = useAddMeasurmentCategoryMutation();
  const postMeasurment = async () => {
    try {
      const result = await addMeasurmentCategory({
        name,
        unit,
      });
      console.log(result);
      if (result?.data) {
        createSnackbar({
          message: "Successfully added measurment",
          type: "success",
        });
      } else {
        createSnackbar({ message: "Something went wrong", type: "error" });
      }

      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add measurement category</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          sx={textFieldWidth}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Unit"
          variant="outlined"
          sx={textFieldWidth}
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
      </DialogContent>

      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={postMeasurment}>
          Add measurment category
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMeasurmentCategoryModal;
