import React from "react";
import { useGetProfilInfoQuery } from "../features/auth/authApiSlice";
import { Box, Typography } from "@mui/material";

const MyAccount = () => {
  const { data, isSuccess, isLoading, isError, error } =
    useGetProfilInfoQuery();

  let content;

  if (isSuccess) {
    console.log(data);
    content = (
      <Box sx={{ padding: "100px" }}>
        <Typography variant="h2" gutterBottom>
          Username:{data.username}
        </Typography>
        <Typography variant="h2" gutterBottom>
          Email: {data.email}{" "}
        </Typography>
      </Box>
    );
  }

  return content;
};

export default MyAccount;
