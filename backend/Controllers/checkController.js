import User from "../models/UserSchema.js";
import Checkout from "../models/CheckoutSchema.js";
import { Stripe } from "stripe";
// import { Description } from "@mui/icons-material";

export const getCheckoutSession = async (req, res) => {
  const userId = req.userId;
  const medId = req.params.id; // Correct extraction of param
  const quantities = req.body; // Destructure to get quantities

  try {
    // Fetch the user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Fetch the medicine from the user's cart
    const med = user.cart.id(medId); // Use subdocument's id method to find the item
    if (!med) {
      return res
        .status(404)
        .json({ success: false, message: "Medicine not found in cart" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}`,
      cancel_url: "http://localhost:5173/users/profile/me",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: med.price * 100,
            product_data: {
              name: med.productName,
              description: med.description,
              images: [med.productphoto],
            },
          },
          quantity: quantities,
        },
      ],
    });
    //create new booking
    const checkout = new Checkout({
      user: user._id,
      Medicine: med.name,
      Quantity: quantities,
      Total: med.price * quantities,
      session: session.id,
    });
    await checkout.save();
    res
      .status(200)
      .json({ success: true, message: "Successfully paid", session });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error creating checkout session " });
  }
};
