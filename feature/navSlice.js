import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: 0,
  destination: null,
  travelTimeInformation: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInormation: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { setOrigin, setDestination, setTravelTimeInormation } =
  navSlice.actions;

export const selectOrigin = () => state.nav.origin;
export const selectDestination = () => state.nav.destination;
export const selectTravelTimeInformation = () =>
  state.nav.travelTimeInformation;
export default navSlice.reducer;
