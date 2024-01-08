import {
  Alert,
  Box,
  Button,
  List,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import React, { useState } from "react";
import {
  useDeleteMeasurmentMutation,
  useGetMeasurmentsDetailsQuery,
  useGetMeasurmentsListQuery,
} from "../features/auth/authApiSlice";
import { useParams } from "react-router-dom";
import AddEditMeasurmentModal from "../components/AddEditMeasurmentModal";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const MeasurmentDetails = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("success");
  const [message, setMessage] = useState("");

  const { id } = useParams();
  const { data, isSuccess } = useGetMeasurmentsDetailsQuery(id);
  const { data: list, isSuccess: isSuccessList } =
    useGetMeasurmentsListQuery(id);

  const [deleteMeasurment] = useDeleteMeasurmentMutation();

  const handleDelete = async (id) => {
    try {
      const result = await deleteMeasurment({ id });
      if (result?.data === null) {
        createSnackbar({
          message: "Sucessfully deleted measurment",
          type: "success",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  let content;
  if (isSuccess && isSuccessList) {
    console.log(data);
    const arr = list.results.map((item) => item.value);
    const dates = list.results.map((item) => item.date);

    arr.reverse();
    dates.reverse();
    content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <TableContainer component={Paper} sx={{ width: 350 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Note</TableCell>
                <TableCell align="right">Date</TableCell>

                <TableCell align="right">{data.unit}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.results.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.notes}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">
                    {row.value} {data.unit}
                  </TableCell>
                  <TableCell>
                    <DeleteIcon onClick={() => handleDelete(row.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <LineChart
          xAxis={[
            {
              scaleType: "point",
              data: [...dates],
            },
          ]}
          series={[
            {
              data: [...arr],
              label: data.name,
            },
          ]}
          width={600}
          height={300}
        />
      </Box>
    );
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
    <Box sx={{ width: "100vw", padding: "100px" }}>
      {content}

      <Button variant="contained" onClick={() => setIsAddModalOpen(true)}>
        Add new value
      </Button>

      <AddEditMeasurmentModal
        createSnackbar={createSnackbar}
        handleClose={() => setIsAddModalOpen(false)}
        open={isAddModalOpen}
        category={data?.id}
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

export default MeasurmentDetails;
