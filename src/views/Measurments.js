import React from "react";
import { useGetMeasurmentsQuery } from "../features/auth/authApiSlice";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const Measurments = () => {
  const { data, isSuccess, isLoading, isError, error } =
    useGetMeasurmentsQuery();
  const navigate = useNavigate();
  let content;
  if (isSuccess) {
    console.log(data);
    content = (
      <div>
        {data.results.map((item) => {
          return (
            <div key={item.id}>
              name: {item.name}
              <br />
              unit: {item.unit}
              <Button
                onClick={() => {
                  navigate(`/measurment/${item.id}`);
                }}
              >
                Details
              </Button>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div>
      Measurment
      <div>{content}</div>
    </div>
  );
};

export default Measurments;
