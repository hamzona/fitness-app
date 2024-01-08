import React, { useState } from "react";
import Input from "@mui/joy/Input";
import { Button } from "@mui/joy";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [login] = useLoginMutation();

  async function hendleSubmit() {
    try {
      const result = await login({ username: username, password });
      if (result?.data) {
        dispatch(setCredentials({ accessToken: result.data.access }));
        localStorage.setItem("refresh-token", result.data.refresh);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Login
      </Typography>

      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button onClick={hendleSubmit}>Submit</Button>

      <Typography variant="body2" display="block" gutterBottom>
        Username: demo1233, password: demomode
      </Typography>
    </Box>
  );
};

export default Login;
