import { combineReducers, legacy_createStore } from "redux";
import { toast } from 'react-toastify'; // Make sure you have this installed and imported

// Initial state
const initialState = {
  number: 0,
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
      return { ...state, number: 0 };
    default:
      return state;
  }
};

const cart = [];

// Action creators
export const addMedicine = ({productName,productphoto,price,quantity,id}) => ({
  type: "ADD_ITEM",
  payload: {productName,productphoto,price,quantity,id},
});


export const removeMedicine = (_id) => ({
  type: "REMOVE_ITEM",
  payload: _id,
});

const medicineReducer = (state = cart, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "UPDATE_ITEM":
      return state.map((item) => item.productName === action.payload.productName ? action.payload.medicine : item)
    case "REMOVE_ITEM":
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  total: reducer,
  medicines: medicineReducer,
});

const store = legacy_createStore(rootReducer);

export default store;
