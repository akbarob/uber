import { configureStore } from "@reduxjs/toolkit";
import uberReducer from "./feature/uberSlice";
import navReducer from "./feature/navSlice";

export const store = configureStore({
  reducer: { uber: uberReducer, nav: navReducer },
});
