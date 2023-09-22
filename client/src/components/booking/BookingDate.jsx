import { CalendarIcon, ClockIcon, Close } from "../systemdesign/Icons";
import { ButtonPrimary } from "../systemdesign/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import dayjs from "dayjs";
import { useAuth } from "../../contexts/authentication";
import { useBooking } from "../../contexts/BookingContext";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
const { RangePicker } = DatePicker;

function BookingDate() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  } = useBooking();
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dateFormat = "DD MMM YYYY";

  const startInputTime = dayjs().add(3, "hour").startOf("hour").minute(0);
  const endInputTime = startInputTime.add(3, "hour");

  const openModal = () => {
    setIsModalOpen(true);
    window.localStorage.removeItem("bookingTime");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const disabledDate = (current) => {
    // ปิดใช้งานวันที่ผ่านมาจากปัจจุบัน
    const isPastDate = current.isBefore(dayjs(), "day");

    return isPastDate;
  };

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates;
      const startYear = startDate.year();
      const startMonth = startDate.month() + 1;
      const startDay = startDate.date();

      const endYear = endDate.year();
      const endMonth = endDate.month() + 1;
      const endDay = endDate.date();

      setStartDate(`${startYear}-${startMonth}-${startDay}`);
      setEndDate(`${endYear}-${endMonth}-${endDay}`);
    }
  };
  // console.log(`${startDate} `);
  // console.log(`${endDate}  `);

  const handleTimeChange = (selectedTimes) => {
    if (selectedTimes.length === 2) {
      const start = selectedTimes[0];
      const end = selectedTimes[1];

      const startTimeString = start.format("h:mm a");
      const endTimeString = end.format("h:mm a");

      const currentTime = dayjs();

      const selectedStartTime = dayjs(startTimeString, "h:mm a");
      const selectedEndTime = dayjs(endTimeString, "h:mm a");
      const minimumBookingTime = currentTime.add(3, "hour");
      const date1 = dayjs(startDate);
      const date2 = dayjs(endDate);

      const date11 = new Date(selectedStartTime.$d);
      const date22 = new Date(selectedEndTime.$d);

      const time1 =
        date11.getHours() * 3600 +
        date11.getMinutes() * 60 +
        date11.getSeconds();
      const time2 =
        date22.getHours() * 3600 +
        date22.getMinutes() * 60 +
        date22.getSeconds();
      if (
        selectedStartTime.isAfter(minimumBookingTime) &&
        date1.$D == date2.$D &&
        time1 < time2
      ) {
        setStartTime(startTimeString);
        setEndTime(endTimeString);
      } else if (
        !selectedStartTime.isAfter(minimumBookingTime) &&
        date1.$D == date2.$D
      ) {
        alert("Please select a booking time at least 3 hours in advance.");
      } else if (date1.isBefore(date2) && time2 < time1) {
        setStartTime(startTimeString);
        setEndTime(endTimeString);
      }
    }
  };

  localStorage.setItem(
    "bookingTime",
    JSON.stringify({
      startDateTime: new Date(`${startDate}  ${startTime}`),
      endDateTime: new Date(`${endDate}  ${endTime}`),
      duration:
        (new Date(`${endDate}  ${endTime}`) -
          new Date(`${startDate}  ${startTime}`)) /
        3600000,
    })
  );

  return (
    <div className="">
      <ButtonPrimary content="Book Now" width=" 250px" onClick={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="w-full h-full ">
          <p className="mb-6 text-body1 text-start">
            Select date and time you want to schedule the service.
            <br />
            Booking at least 3 hours in advance, please.
          </p>
          <div className="mb-6 flex items-center justify-between">
            <CalendarIcon />
            <RangePicker
              style={{ width: "92%", height: "48px" }}
              onChange={handleDateChange}
              format={dateFormat}
              disabledDate={disabledDate}
            />
          </div>
          <div className="flex items-center justify-between mb-[3.75rem]">
            <ClockIcon />
            <TimePicker.RangePicker
              style={{ width: "92%", height: "48px" }}
              format="h:mm a"
              minuteStep={30}
              onChange={handleTimeChange}
              defaultValue={[startInputTime, endInputTime]}
              inputReadOnly={true}
              allowClear={false}
              order={false}
            />
          </div>
          <div
            onClick={() => {
              navigate(`/booking/${userData.id}/${params.sitterId}`);
            }}
          >
            <ButtonPrimary
              width={"100%"}
              content={"Continue"}
              disabled={!startDate || !endDate || !startTime || !endTime}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export const Modal = ({ isOpen, onClose, children }) => {
  const { setStartDate, setEndDate, setStartTime, setEndTime } = useBooking();
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-0 "
      style={{ background: "rgba(0, 0, 0, 0.75)" }}
    >
      <div className="relative z-10">
        <div className="w-[560px] bg-etc-white h-[440px] rounded-2xl opacity-1">
          <div className="px-10 py-6 border-b justify-between items-center gap-2.5 flex">
            <div className="text-headline3">Booking</div>
            <Close
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setStartTime("");
                setEndTime("");
                onClose();
              }}
            />
          </div>
          <div className="m-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BookingDate;
