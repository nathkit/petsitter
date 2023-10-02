import TextField from "@mui/material/TextField";
import { useAuth } from "../../contexts/authentication";
import { useBooking } from "../../contexts/BookingContext";

function Booking2() {
  const { userData } = useAuth();
  const { bookingMessage, setBookingMessage } = useBooking();

  const handleTextChange = (e) => {
    setBookingMessage(e.target.value);
  };

  return (
    <>
      <div className=" bg-etc-white p-10  h-fit">
        <label htmlFor="name">Your Name*</label>
        <TextField
          fullWidth
          id="name"
          name="name"
          value={userData.fullName}
          InputProps={{
            sx: { borderRadius: " 8px", backgroundColor: "#f6f6f9" },
          }}
          disabled
        />
        <div className="flex justify-between my-10 ">
          <div className=" flex flex-col w-full mr-10">
            <label htmlFor="email">Email*</label>
            <TextField
              id="email"
              name="email"
              type="email"
              value={userData.email}
              className="w-[100%]"
              InputProps={{
                sx: { borderRadius: " 8px", backgroundColor: "#f6f6f9" },
              }}
              disabled
            />
          </div>
          <div className=" flex flex-col w-full">
            <label htmlFor="phone">Phone*</label>
            <TextField
              id="phone"
              name="phone"
              type="tel"
              value={userData.phone}
              className="w-[100%]"
              InputProps={{
                sx: { borderRadius: " 8px", backgroundColor: "#f6f6f9" },
              }}
              disabled
            />
          </div>
        </div>
        <hr className="mb-10" />
        <label htmlFor="message">Additional Message (To pet sitter)</label>
        <TextField
          fullWidth
          id="message"
          multiline
          rows={4}
          color="warning"
          InputProps={{ sx: { borderRadius: " 8px" } }}
          value={bookingMessage}
          onChange={handleTextChange}
        />
      </div>
    </>
  );
}

export default Booking2;
