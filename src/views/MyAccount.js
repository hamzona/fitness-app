import React from "react";
import { useGetProfilInfoQuery } from "../features/auth/authApiSlice";

const MyAccount = () => {
  const { data, isSuccess, isLoading, isError, error } =
    useGetProfilInfoQuery();

  let content;

  if (isSuccess) {
    console.log(data);
    content = (
      <div>
        MyAccount
        <h1>username:{data.username}</h1>
        <h2>Email: {data.email}</h2>
        <h2>Height: {data.height}</h2>
        <h2>Calories: {data.calories}</h2>
      </div>
    );
  }

  return content;
};

export default MyAccount;
