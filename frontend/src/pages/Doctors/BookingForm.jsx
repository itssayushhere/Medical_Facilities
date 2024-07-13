/* eslint-disable react/prop-types */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import defaultPhoto from "../../assets/images/user.webp";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../../config";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function BookingForm({
  Name,
  photo,
  hospital,
  speicalization,
  ticketPrice,
  timeSlots,
  Description,
  id
}) {
  const [open, setOpen] = React.useState(false);
  const [meetingType, setMeetingType] = React.useState("video");
  const [time, setTime] = React.useState();
  const [booking,setBooking] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const AppDate = (day) => {
    const date = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const targetDayIndex = daysOfWeek.indexOf(day);
    const currentDayIndex = date.getDay();
    
    const daysToAdd = (targetDayIndex + 7 - currentDayIndex) % 7;
    date.setDate(date.getDate() + daysToAdd);

    return date.toISOString();
  };

  const handleBooking = async () => {
    setBooking(true)
    const date = AppDate(time.day);
    const booking = {
      doctorName: Name,
      doctorPhoto: photo || "https://res.cloudinary.com/do6ys5rlf/image/upload/v1720817961/ekdasi8l2gzdejg8ydkr.webp",
      doctorDescription: Description,
      ticketPrice,
      meeting: meetingType,
      appointmentDate: date,
      time: time ? `${time.startingTime}-${time.endingTime}` : time,
    };

    try {
      const res = await fetch(`${BASE_URL}/book/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });
      if (res.ok) {
        const data = await res.json();
        window.location.href = data.url;
        setBooking(false)
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Some weird error");
        setBooking(false)
      }
    } catch (error) {
      console.error(error);
      toast.error("Checkout Error");
      setBooking(false)
      
    }
  };

  return (
    <React.Fragment>
      <button className="btn px-2 w-full rounded-md" onClick={handleClickOpen}>
        Request Appointment
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <h1 className="font-bold border-b-4 border-blue-800 mr-14">
          Appointment Booking
          </h1>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="container">
            <div className="">
              <div className="relative ">
                <button
                  className="absolute sm:mt-[270px] mt-[200px] bg-blue-400 text-blue-950 font-extrabold px-5 py-0.5 rounded-r-lg"
                  disabled
                >
                  {speicalization}
                </button>
                <div className="w-70 h-50 object-cover overflow-hidden rounded-lg mx-auto border-4">
                  {photo ? (
                    <img
                      src={photo}
                      alt="doctor Image"
                      width={300}
                      height={300}
                      className="mx-auto"
                    />
                  ) : (
                    <img
                      src={defaultPhoto}
                      alt="doctor Image"
                      width={300}
                      height={300}
                      className="mx-auto"
                    />
                  )}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-center">{Name}</h1>
              </div>
              <div className="flex gap-1 justify-center items-center font-semibold text-center pb-0.5">
                <p>Working at </p>
                <p className="text-blue-950">{hospital}</p>
              </div>
              <div className="flex justify-center items-center pb-1">
                <p className="font-semibold">Charges of Appointment:</p>
                <p className="font-bold text-green-600">₹{ticketPrice}</p>
              </div>
              <div className="flex justify-center items-center font-medium">
                <p className="font-bold">Select Meeting Type:</p>
                <select
                  name="meeting"
                  id=""
                  className="border-b border-black rounded"
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  required
                >
                  <option value="video">Video Conference</option>
                  <option value="hospital">At Hospital</option>
                </select>
              </div>
              <div className="flex mt-2">
                <h1 className=" mr-2 font-extrabold">TimeSlots</h1>
                {timeSlots &&
                  timeSlots.map((items, index) => (
                    <div key={index}>
                      <div className="flex justify-start items-center gap-1 font-medium">
                        <input
                          type="radio"
                          name="timeslots"
                          id=""
                          value={items}
                          onChange={() => setTime(items)}
                          required
                        />
                        <p>{items.day}</p>
                        <p>{items.startingTime}</p>
                        <p>-</p>
                        <p>{items.endingTime}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex items-center gap-2 font-bold">
          <button autoFocus disabled={booking && true} onClick={handleBooking} className=" text-blue-600">
            Book Appointment
          </button>
          <button onClick={handleClose} className="text-blue-600">Cancel</button>
          </div>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
