import { createSlice } from "@reduxjs/toolkit";

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: { ingredients: [] },
  reducers: {
    setIngredients: (state, action) => {
      state.ingredient.ingredients = action.payload;
    },
  },
});

export const { setIngredients } = ingredientSlice.actions;
export default ingredientSlice.reducer;
