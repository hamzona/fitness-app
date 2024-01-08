import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { usePostMeasurmentMutation } from "../features/auth/authApiSlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const textFieldWidth = {
  width: "60%",
  marginTop: "20px",
};
const AddEditMeasurmentModal = ({
  open,
  handleClose,
  createSnackbar,
  category,
}) => {
  const [value, setValue] = useState(0);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [createMeasurment] = usePostMeasurmentMutation();
  const postMeasurment = async () => {
    console.log(date);
    try {
      const result = await createMeasurment({
        category,
        value,
        notes: description,
        date,
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
      <DialogTitle>Add measurement</DialogTitle>
      <DialogContent>
        <TextField
          label="Value"
          variant="outlined"
          sx={textFieldWidth}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <TextField
          label="Notes"
          variant="outlined"
          sx={textFieldWidth}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={textFieldWidth}
            label="Set date"
            value={dayjs(date)}
            onChange={(e) => {
              setDate(e.format("YYYY-MM-DD"));
            }}
          />
        </LocalizationProvider>
      </DialogContent>

      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={postMeasurment}>
          Add measurment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditMeasurmentModal;
