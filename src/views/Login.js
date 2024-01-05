import React, { useState } from "react";
import Input from "@mui/joy/Input";
import { Button } from "@mui/joy";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [login] = useLoginMutation();

  async function hendleSubmit() {
    try {
      const result = await login({ username: email, password });
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
    <div>
      <h1>Login</h1>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
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
    </div>
  );
};

export default Login;
