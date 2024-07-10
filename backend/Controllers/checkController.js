import User from "../models/UserSchema.js";
import Checkout from "../models/CheckoutSchema.js";
import { Stripe } from "stripe";

export const getCheckoutSession = async (req, res) => {
  const userId = req.userId;
  const items = req.body; // assuming body contains an array of items

  try {
    // Fetch the user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "inr",
        unit_amount: item.price * 100,
        product_data: {
          name: item.productName,
          description: item.description,
          images: [item.productphoto],
        },
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.SUCCESS_SITE_URL}`,
      cancel_url: `${process.env.CANCEL_SITE_URL}`,
      customer_email: user.email,
      line_items: lineItems,
    });

    // Create new booking
    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const checkout = new Checkout({
      user: user._id,
      Medicine: items.map((item) => ({ Name: item.productName, Quantity: item.quantity })), // mapping items to objects with Name and Quantity
      Total: totalAmount,
      session: session.id,
    });
    
    await checkout.save();

    // Return the session URL to the client
    res
      .status(200)
      .json({ success: true, message: "Session created", url: session.url });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating checkout session",
      error,
    });
  }
};
