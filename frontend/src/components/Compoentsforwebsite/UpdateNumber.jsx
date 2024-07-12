/* eslint-disable react/prop-types */
import  { useEffect, useRef } from "react";
import {  useDispatch } from "react-redux";
import { addMedicine} from "./Store";

// UpdateNumber component to dispatch an action to update the number
const UpdateNumber = ({ total} ) => {
  const dispatch = useDispatch(); // Get the dispatch function
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      dispatch({ type: "plus", payload: total }); // Dispatch an action on first mount
      hasMounted.current = true;
    }
  }, [dispatch, total]);

  return null;
};

// const Counter = (total) =>{
//     <Provider store={store}>
//         <UpdateNumber total={total}/>
//     </Provider>
// }
export default UpdateNumber;

export const Addtocart = ({productName,productphoto,price,quantity,id}) => {
  const dispatch = useDispatch();
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      dispatch(addMedicine({productName,productphoto,price,quantity,id}));
      hasMounted.current = true;
    }
  }, [dispatch, productName,productphoto,price,quantity,id]);
  return null;
};
