import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Login from "./views/Login";
import RequireAuth from "./features/auth/RequireAuth";
import Home from "./views/Home";
import PersistLogin from "./features/auth/PersistLogin";
import Measurments from "./views/Measurments";
import MyAccount from "./views/MyAccount";
import NutritionPlan from "./views/NutritionPlan";
import IngredientOverview from "./views/IngredientOverview";
import MeasurmentDetails from "./views/MeasurmentDetails";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ingredientOverview" element={<IngredientOverview />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/measurment" element={<Measurments />} />{" "}
            <Route path="/measurment/:id" element={<MeasurmentDetails />} />
            <Route path="/myAccount" element={<MyAccount />} />
            <Route path="/nutritionPlan" element={<NutritionPlan />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
