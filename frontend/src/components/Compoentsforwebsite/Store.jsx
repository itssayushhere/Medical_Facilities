import { legacy_createStore } from "redux";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  number: 0,
  reloadKey: Date.now(), // Initialize reloadKey with the current timestamp
};

// Reducer function to handle state changes based on actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "plus":
      if (typeof action.payload === "number") {
        return { ...state, number: state.number + action.payload };
      } else {
        toast.error("Payload must be a number");
        return state;
      }
    case "Increase":
      return { ...state, number: state.number + action.payload };
    case "Decrease":
      return { ...state, number: state.number - action.payload };
    case "Reload":
      return { ...state, number:state.number = 0 }; // Update reloadKey to current timestamp
    default:
      return state;
  }
};

// Create the Redux store with the given reducer
const store = legacy_createStore(reducer);

export default store;
