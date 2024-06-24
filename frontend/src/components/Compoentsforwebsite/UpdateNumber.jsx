import React, { useEffect, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./Store";

// UpdateNumber component to dispatch an action to update the number
const UpdateNumber = ({ total }) => {
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
