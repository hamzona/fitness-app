import React from "react";
import {
  useGetMeasurmentsDetailsQuery,
  useGetMeasurmentsListQuery,
} from "../features/auth/authApiSlice";
import { useParams } from "react-router-dom";

const MeasurmentsDetails = () => {
  const { id } = useParams();
  const { data, isSuccess } = useGetMeasurmentsDetailsQuery(id);
  const { data: list, isSuccess: isSuccessList } = useGetMeasurmentsListQuery();

  let content;
  if (isSuccess && isSuccessList) {
    content = (
      <div>
        <h2>{data.name}</h2>

        {list.results.map((item) => {
          return (
            <div key={item.id}>
              {item.date} {item.value}
              {data.unit}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      MeasurmentsDetails
      {content}
    </div>
  );
};

export default MeasurmentsDetails;
