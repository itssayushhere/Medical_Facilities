import React, { useEffect, useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import UpdateNumber from "./UpdateNumber";
import store from "./Store";
import { Provider, useDispatch } from "react-redux";
import useFetchData from "../../hooks/usefetchData";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const QuantityCounter = ({ productName, price, id }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleIncrement = (price) => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    dispatch({ type: "Increase", payload: price });
  };

  const handleDecrement = (price) => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    if (quantity > 1) {
      dispatch({ type: "Decrease", payload: price });
    }
  };

  const Delete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/users/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Correctly place Authorization in headers
          "Content-Type": "application/json", // Optional, but good practice
        },
      });

      if (response.ok) {
        toast.success("Removed from cart");
        window.location.reload();
      } else {
        // Handle the case where the response is not ok
        const errorMessage = await response.text();
        toast.error(`Error removing item: ${errorMessage}`);
      }
    } catch (error) {
      toast.error("Error removing item");
    }
  };

  const handleQuantity = async (id, quantity) => {
    try {
      const response = await fetch(`${BASE_URL}/users/updatecart/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Optional, but good practice
        },
        body: JSON.stringify({ quantity: quantity }),
      });
      const result = await response.json();
      if (response.ok) {
        // toast.success("updated");
        // console.log(result);
      } else {
        toast.error("Not updated");
        console.log(result);
      }
    } catch (error) {
      toast.error("error");
    }
  };

  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      handleQuantity(id, quantity);
      hasMounted.current = true;
    }
  }, [id]);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        className="p-4 border-x-2 border-x-slate-400 mb-4 rounded-2xl "
      >
        <Grid item xs={6} sm={4}>
          <h2 className="font-bold text-lg">{productName}</h2>
          <p className="text-sm text-gray-600">Price: {price}</p>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className="mr-8">
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 text-white font-bold py-1 px-2 rounded"
                onClick={() => {
                  handleIncrement(price);
                  handleQuantity(id, parseInt(quantity + 1));
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
                  handleQuantity(id, parseInt(quantity));
                }}
              >
                -
              </button>
            </div>
          </div>
        </Grid>
        <Grid item xs={10} sm={3} container justifyContent={"center"}>
          <Grid item>
            <p className="font-bold text-lg">₹{price * quantity}</p>
            <Provider store={store}>
              <UpdateNumber total={price} />
            </Provider>
          </Grid>
        </Grid>
        <Grid item xs={2} sm={2} container justifyContent={"end"}>
          <button className="ml-2">
            <RiDeleteBin6Line
              size={25}
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
