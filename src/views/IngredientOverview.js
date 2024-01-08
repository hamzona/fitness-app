import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useGetIngredientsMutation } from "../features/auth/authApiSlice";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const IngredientOverview = () => {
  const [ingredients, setIngredients] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling
    });
  };

  const [getIngredients] = useGetIngredientsMutation();
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getIngredients({ page });

        console.log(data);
        if (data?.data?.results) {
          setIngredients(data.data.results);
          setCount(parseInt(data.data.count / 20));
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchIngredients();
    scrollToTop();
  }, [page]);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {ingredients &&
          ingredients.map((ingredient) => {
            return (
              <Card key={ingredient.id} sx={{ width: "350px", margin: "20px" }}>
                <CardMedia
                  component="img"
                  sx={{ height: 140 }}
                  image={ingredient?.image?.image}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {ingredient.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    carbohydrates: {ingredient.carbohydrates}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    sugar: {ingredient.carbohydrates_sugar}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    calories: {ingredient.energy} kcal
                  </Typography>{" "}
                  <Typography variant="body2" color="text.secondary">
                    fat: {ingredient.fat}
                  </Typography>{" "}
                  <Typography variant="body2" color="text.secondary">
                    fat saturated: {ingredient.fat_saturated}
                  </Typography>{" "}
                  <Typography variant="body2" color="text.secondary">
                    fibers: {ingredient.fibers}
                  </Typography>{" "}
                  <Typography variant="body2" color="text.secondary">
                    proteins: {ingredient.protein}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      navigate(`/ingredientOverview/${ingredient.id}`);
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </Box>
      <Stack spacing={2} sx={{ margin: "100px" }}>
        <Pagination
          count={count}
          size="large"
          onChange={(e, p) => {
            setPage(p);
          }}
        />
      </Stack>
    </Box>
  );
};

export default IngredientOverview;
