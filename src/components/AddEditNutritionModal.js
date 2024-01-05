import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useCreateNutritionPlanMutation,
  useEditNutritonPlanMutation,
} from "../features/auth/authApiSlice";

const textFieldWidth = {
  width: "60%",
  marginTop: "20px",
};

export default function AddEditNutritionModal({
  open,
  handleClose,
  isEditMode,
  planToEdit,
  createSnackbar,
}) {
  const [calories, setCalories] = useState(0);
  const [fat, setFat] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [description, setDescription] = useState("");

  const [createPlan] = useCreateNutritionPlanMutation();
  const [editPlan] = useEditNutritonPlanMutation();
  const createNutritionPlan = async () => {
    try {
      if (isEditMode) {
        const result = await editPlan({
          id: planToEdit.id,
          description,
          goal_energy: calories,
          goal_protein: proteins,
          goal_carbohydrates: carbohydrates,
          goal_fat: fat,
        });
        if (result?.data) {
          createSnackbar({
            message: "Successfully edited nutrition plan",
            type: "success",
          });
        } else {
          createSnackbar({ message: "Something went wrong", type: "error" });
        }
        console.log(result);
      } else {
        const result = await createPlan({
          description,
          goal_energy: calories,
          goal_protein: proteins,
          goal_carbohydrates: carbohydrates,
          goal_fat: fat,
        });
        console.log(result);
        if (result?.data) {
          createSnackbar({
            message: "Successfully created nutrition plan",
            type: "success",
          });
        } else {
          createSnackbar({ message: "Something went wrong", type: "error" });
        }
      }
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(planToEdit);
    if (isEditMode) {
      setCalories(planToEdit.goal_energy);
      setFat(planToEdit.goal_fat);
      setCarbohydrates(planToEdit.goal_carbohydrates);
      setProteins(planToEdit.goal_protein);
      setDescription(planToEdit.description);
    } else {
      setCalories(0);
      setFat(0);
      setProteins(0);
      setCarbohydrates(0);
      setDescription("");
    }
  }, [open]);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add nutrition</DialogTitle>
      <DialogContent>
        <TextField
          label="Calories"
          variant="outlined"
          sx={textFieldWidth}
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <TextField
          label="Proteins"
          variant="outlined"
          sx={textFieldWidth}
          value={proteins}
          onChange={(e) => setProteins(e.target.value)}
        />
        <TextField
          label="Fat"
          variant="outlined"
          sx={textFieldWidth}
          value={fat}
          onChange={(e) => setFat(e.target.value)}
        />
        <TextField
          label="Carbohydrates"
          variant="outlined"
          sx={textFieldWidth}
          value={carbohydrates}
          onChange={(e) => setCarbohydrates(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          sx={textFieldWidth}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></TextField>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={createNutritionPlan}
        >{` recipe`}</Button>
      </DialogActions>
    </Dialog>
  );
}
