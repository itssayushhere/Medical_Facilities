/* eslint-disable react/prop-types */
import { useState } from "react";
import UpdateNumber from "./UpdateNumber";
import store from "./Store";
import { Provider, useDispatch } from "react-redux";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
const QuantityCounter = ({ productName, price, id, productphoto,onItemDeleted }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [deleting,setDeleting] =useState(false)
  const medicine = {
    price,
    productName,
    productphoto,
    quantity:quantity+1,
    id,
  }
  const handleIncrement = (price) => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    dispatch({ type: "Increase", payload: price });
    dispatch({ type: "UPDATE_ITEM",
      payload: { productName, medicine },
    })
  };
  
  const handleDecrement = (price) => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    if (quantity > 1) {
      dispatch({ type: "Decrease", payload: price });
      dispatch({ type: "UPDATE_ITEM",
        payload: { productName, medicine },
      })
    }

  };

  const Delete = async (id) => {
    try {
      setDeleting(true)
      const response = await fetch(`${BASE_URL}/users/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Correctly place Authorization in headers
          "Content-Type": "application/json", // Optional, but good practice
        },
      });

      if (response.ok) {
        toast.success("Removed from cart", {
          autoClose: 600, // Toast duration in milliseconds
          position: "bottom-center",
        });
        onItemDeleted();
        dispatch({ type: "Decrease", payload: price * quantity });
        setDeleting(false)
      } else {
        // Handle the case where the response is not ok
        const errorMessage = await response.text();
        toast.error(`Error removing item: ${errorMessage}`, {
          autoClose: 600, // Toast duration in milliseconds
          position: "bottom-center",
        });
        setDeleting(false)
      }
    } catch (error) {
      toast.error("Error removing item");
      setDeleting(false)
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        className="p-4 border-x-2 border-x-slate-400 mb-4 rounded-2xl "
      >
        <Grid item xs={12} sm={4} container justifyContent={"center"}>
          <div>
            <h2 className="font-bold text-lg">{productName}</h2>
            <p className="text-sm text-gray-600">Price: {price}</p>
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className="mr-8">
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 text-white font-bold py-1 px-2 rounded"
                onClick={() => {
                  handleIncrement(price);
                }}
              >
                +
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="text-center w-12 mx-2 border border-gray-300 rounded"
              />
              <button
                className="bg-red-500 text-white font-bold py-1 px-2 rounded"
                onClick={() => {
                  handleDecrement(price);
                }}
              >
                -
              </button>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} sm={3} container justifyContent={"end"}>
          <Grid item>
            <p className="font-bold text-lg">₹{price * quantity}</p>
            <Provider store={store}>
              <UpdateNumber total={price} />
            </Provider>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={2} container justifyContent={"center"}>
          <button className="ml-2" disabled={deleting && true}>
            <DeleteIcon
              className="text-red-300 hover:text-red-500"
              onClick={() => Delete(id)}
            />
          </button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuantityCounter;
