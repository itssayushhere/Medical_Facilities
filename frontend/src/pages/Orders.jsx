import React, { useEffect, useState } from "react";
import { BASE_URL, token } from "../../config.js";
import QuantityCounter from "../components/Compoentsforwebsite/QunatityCounter.jsx";
import { useSelector, Provider, useDispatch } from "react-redux";
import store from "../components/Compoentsforwebsite/Store.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import CircularIndeterminate from "../components/Loader/Circular.jsx";
import { FaShoppingCart } from "react-icons/fa";
const Orders = () => {
  const DisplayNumber = () => {
    const number = useSelector((state) => state.number); // Access the current state
    return <p>₹{number}</p>;
  };

  // const [error, setError] = useState(null);
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setloading] = useState(true);

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
        setloading(false);
      } else {
        throw new Error("Failed to fetch cart details");
        setloading(false);
      }
    } catch (error) {
      console.error("Error fetching cart details:", error);
      toast.error("Failed to fetch cart details");
      setloading(false);
      // setError(error.message);
    }
  };
  const navigate = useNavigate();

  const handleAddToCartClick = () => {
    navigate("/medicine");
  };
  useEffect(() => {
    fetchCartDetails();
  }, []);

  const checkoutStripe = async () => {
    try {
      const res = await fetch(`${BASE_URL}/buyout/now`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartDetails),
      });

      if (res.ok) {
        const data = await res.json(); // Parse the response body
        toast.success("Checkout Successful");
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        const errorData = await res.json(); // Parse the error response
        toast.error(errorData.message || "Some weird error");
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.error("Checkout Error");
    }
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
        {cartDetails && cartDetails.length > 0 ? (
          cartDetails.map((item) => (
            <div key={item._id} className="flex items-center mb-3">
              <Provider store={store}>
                <QuantityCounter
                  productName={item.productName}
                  price={item.price}
                  id={item._id}
                  photo={item.productphoto}
                  onItemDeleted={fetchCartDetails}
                />
              </Provider>
            </div>
          ))
        ) : (
          <div>
            {loading ? (
              <div className="flex items-center w-full h-full justify-center">
                <CircularIndeterminate />
              </div>
            ) : (
              <div className="text-center">
                <div> Your Cart is Empty...</div>
                <div>
                  <button
                    onClick={handleAddToCartClick}
                    className="p-2 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-700"
                  >
                    Add to cart now
                  </button>
                </div>
              </div>
            )}
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
          <Button variant="contained" size="medium" onClick={checkoutStripe}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
