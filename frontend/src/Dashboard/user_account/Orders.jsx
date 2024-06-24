import React, { useState, useEffect } from "react";
import { BASE_URL, token } from "../../../config";
import usefetchData from "../../hooks/usefetchData.jsx";
import Loading from "../../components/Loader/Loading.jsx";
import { FaShoppingCart } from "react-icons/fa";
import QuantityCounter from "../../components/Compoentsforwebsite/QunatityCounter.jsx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector, Provider, useDispatch } from "react-redux";
import store from "../../components/Compoentsforwebsite/Store.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import { useRef } from "react";

const Orders = () => {
  const DisplayNumber = () => {
    const number = useSelector((state) => state.number); // Access the current state
    return <p>₹{number}</p>;
  };
  const [userData, loading, error] = usefetchData(
    `${BASE_URL}/users/profile/me`
  );
  // const [error, setError] = useState(null);
  const [cartDetails, setCartDetails] = useState([]);

  const fetchCartDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/cart/getcart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCartDetails(data); // Assuming data is an array of cart items
      } else {
        throw new Error("Failed to fetch cart details");
      }
    } catch (error) {
      console.error("Error fetching cart details:", error);
      toast.error("Failed to fetch cart details");
      // setError(error.message);
    }
  };

  // const Delete = async (id) => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/users/cart/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Correctly place Authorization in headers
  //         "Content-Type": "application/json", // Optional, but good practice
  //       },
  //     });

  //     if (response.ok) {
  //       toast.success("Removed from cart");
  //       window.location.reload();
  //     } else {
  //       // Handle the case where the response is not ok
  //       const errorMessage = await response.text();
  //       toast.error(`Error removing item: ${errorMessage}`);
  //     }
  //   } catch (error) {
  //     toast.error("Error removing item");
  //   }
  // };

  const navigate = useNavigate();

  const handleAddToCartClick = () => {
    navigate("/medicine");
  };

  return (
    <div className="container mx-auto p-4 w-[750px]">
      <div className="flex items-center m-3 p-4 border-x-gray-900 rounded-xl border-t-2 shadow-xl gap-4 justify-between">
        <div className="flex gap-3 justify-normal items-center">
          <FaShoppingCart color="lightblue" size={30} />
          <h1 className="font-bold text-xl">Medicine Cart</h1>
        </div>
        <div className="mr-4">
          <Tooltip title="Add more">
            <Fab
              size="medium"
              color="primary"
              aria-label="add"
              onClick={handleAddToCartClick}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
      </div>

      <div className="m-3 p-4 ">
        {loading && !error && <Loading />}
        {!loading && userData && userData.cart && userData.cart.length > 0 ? (
          userData.cart.map((item) => (
            <div key={item._id} className="flex items-center mb-3">
              <Provider store={store}>
                <QuantityCounter
                  productName={item.productName}
                  price={item.price}
                  id={item._id}
                  photo={item.productphoto}
                />
              </Provider>
              {/* <button className="ml-2">
                <RiDeleteBin6Line
                  size={25}
                  className="text-red-300 hover:text-red-500"
                  onClick={() => Delete(item._id)}
                />
              </button> */}
            </div>
          ))
        ) : (
          <div className="text-center">
            <div> Your Cart is Empty...</div>
            <div>
              <button onClick={handleAddToCartClick}>Add to cart now</button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center m-3 p-4 border-y-gray-600 rounded-xl border-b-2 shadow-sm gap-4">
        <div className=" font-bold text-lg">
          Total :
          <Provider store={store}>
            <DisplayNumber />
          </Provider>
        </div>
        <div>
          <Button variant="contained" size="medium" onClick={fetchCartDetails}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
