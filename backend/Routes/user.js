import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserProfile,
  getMyAppointments,
  getCartDetails,
  addToCart,
  addtocheckup,
  deletecart,
  updatequantity,
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
const router = express.Router();
router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);
router.get("/", authenticate, restrict(["admin"]), getAllUser);
router.put("/:id", authenticate, restrict(["patient"]), updateUser);
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);
router.get("/cart/getcart", authenticate, getCartDetails);

router.post("/addtocart", authenticate, addToCart);
router.post("/addtocheckup", authenticate, addtocheckup);
router.delete("/cart/:id", authenticate, deletecart);
router.put("/updatecart/:id", authenticate, updatequantity);
export default router;
