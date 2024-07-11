import express from "express"
import { authenticate } from "../auth/verifyToken.js";
import { BookDoctor, getDoctorBookingDetails, getUserBookingDetails } from "../Controllers/BookingController.js";
const router = express.Router()
router.post('/:id',authenticate,BookDoctor)
router.get('/user',authenticate,getUserBookingDetails)
router.get('/doctor',authenticate,getDoctorBookingDetails)
export default router;