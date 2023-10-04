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
    setPetIds,
    setPetIdsNames,
    setTotalAmount,
    time1,
    setTime1,
    time2,
    setTime2,
    startDay,
    setStartDay,
    endDay,
    setEndDay,
  } = useBooking();
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dateFormat = "DD MMM YYYY";
  // const [startDay, setStartDay] = useState("");
  // const [endDay, setEndDay] = useState("");
  // const startInputTime = dayjs().startOf("hour").minute(0);
  // const endInputTime = startInputTime.add(1, "hour").startOf("hour").minute(0);
  const [disable, setDisable] = useState(true);
  const [checkStartTime, setCheckStartTime] = useState(dayjs().add(4, "hour"));
  // const [time1, setTime1] = useState(null);
  // const [time2, setTime2] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
    window.localStorage.removeItem("bookingTime");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const disabledDate = (current) => {
    const isPastDate = current.isBefore(dayjs(), "day");

    return isPastDate;
  };

  const handleDateChange = (selectedDate) => {
    if (selectedDate.length === 2) {
      const start = selectedDate[0];
      const end = selectedDate[1];

      const startYear = start.year();
      const startMonth = start.month() + 1;
      const startDay = start.date();

      const endYear = end.year();
      const endMonth = end.month() + 1;
      const endDay = end.date();

      setStartDay(startDay);
      setEndDay(endDay);

      setStartDate(`${startYear}-${startMonth}-${startDay}`);
      setEndDate(`${endYear}-${endMonth}-${endDay}`);

      const currentDate = dayjs().$D;
      const minimumBookingTime = dayjs().add(3, "hour");

      if (
        checkStartTime.isAfter(minimumBookingTime) &&
        startDay == currentDate &&
        endDay == currentDate &&
        time1 < time2
      ) {
        setDisable(false);
        setStartDate(`${startYear}-${startMonth}-${startDay}`);
        setEndDate(`${endYear}-${endMonth}-${endDay}`);
        console.log(1);
      } else if (
        // checkStartTime.isAfter(minimumBookingTime) &&
        startDay == currentDate &&
        endDay == currentDate &&
        time1 > time2
      ) {
        alert("Please select the correct time.");
        setDisable(true);
        console.log(2);
      } else if (
        startDay !== currentDate &&
        endDay !== currentDate &&
        startDay !== endDay &&
        time1 !== null &&
        time2 !== null &&
        time2 !== "" &&
        time1 !== ""
      ) {
        setDisable(false);
        setStartDate(`${startYear}-${startMonth}-${startDay}`);
        setEndDate(`${endYear}-${endMonth}-${endDay}`);
        console.log(4);
      } else if (
        checkStartTime.isAfter(minimumBookingTime) &&
        startDay == currentDate &&
        endDay !== currentDate &&
        time1 !== null &&
        time2 !== null &&
        time2 !== "" &&
        time1 !== ""
      ) {
        setDisable(false);
        setStartDate(`${startYear}-${startMonth}-${startDay}`);
        setEndDate(`${endYear}-${endMonth}-${endDay}`);
        console.log(5);
      } else if (
        startDay !== currentDate &&
        endDay !== currentDate &&
        startDay == endDay &&
        time1 < time2
      ) {
        setDisable(false);
        setStartDate(`${startYear}-${startMonth}-${startDay}`);
        setEndDate(`${endYear}-${endMonth}-${endDay}`);
        console.log(7);
      } else if (
        startDay !== currentDate &&
        endDay !== currentDate &&
        startDay == endDay &&
        time1 > time2
      ) {
        alert("Please select the correct time.");
        setDisable(true);
        console.log(8);
      } else if (startDay == "" && endDay == "") {
        alert("Please select a booking time.");
        setDisable(true);
        console.log(9);
      }
    }
  };
  // console.log(start, "start");
  // console.log(end, "end");
  // console.log(startDate);
  // console.log(endDate);

  const handleTimeChange = (selectedTimes) => {
    if (selectedTimes.length === 2) {
      const start = selectedTimes[0];
      const end = selectedTimes[1];

      const startTimeString = start.format("h:mm a");
      const endTimeString = end.format("h:mm a");
      // console.log(startTimeString, "startTimeString2");
      const currentDate = dayjs().$D;

      const selectedStartTime = dayjs(startTimeString, "h:mm a");
      const selectedEndTime = dayjs(endTimeString, "h:mm a");
      const minimumBookingTime = dayjs().add(3, "hour");

      setCheckStartTime(dayjs(startTimeString, "h:mm a"));

      const startTime = new Date(selectedStartTime.$d);
      const endTime = new Date(selectedEndTime.$d);

      const time1 =
        startTime.getHours() * 3600 +
        startTime.getMinutes() * 60 +
        startTime.getSeconds();
      const time2 =
        endTime.getHours() * 3600 +
        endTime.getMinutes() * 60 +
        endTime.getSeconds();
      setTime1(time1);
      setTime2(time2);
      if (
        selectedStartTime.isAfter(minimumBookingTime) &&
        startDay == currentDate &&
        endDay == currentDate &&
        time1 < time2
      ) {
        setStartTime(startTimeString);
        setEndTime(endTimeString);
        setDisable(false);
        console.log(1);
      } else if (
        selectedStartTime.isAfter(minimumBookingTime) &&
        startDay == currentDate &&
        endDay == currentDate &&
        time1 >= time2
      ) {
        alert("Please select the correct time.");
        setDisable(true);
        console.log(2);
      } else if (
        currentDate == startDay &&
        endDay == currentDate &&
        !selectedStartTime.isAfter(minimumBookingTime)
      ) {
        alert("Please select a booking time at least 3 hours in advance.");
        setDisable(true);
        console.log(3);
      } else if (
        startDay !== currentDate &&
        endDay !== currentDate &&
        startDay !== endDay
      ) {
        setStartTime(startTimeString);
        setEndTime(endTimeString);
        setDisable(false);
        console.log(4);
      } else if (
        selectedStartTime.isAfter(minimumBookingTime) &&
        startDay == currentDate &&
        endDay !== currentDate
      ) {
        setStartTime(startTimeString);
        setEndTime(endTimeString);
        setDisable(false);
        console.log(5);
      } else if (
        startDay == currentDate &&
        endDay !== currentDate &&
        !selectedStartTime.isAfter(minimumBookingTime)
      ) {
        alert("Please select a booking time at least 3 hours in advance.");
        setDisable(true);
        console.log(6);
      } else if (
        startDay !== currentDate &&
        endDay !== currentDate &&
        startDay == endDay &&
        startDay !== "" &&
        endDay !== "" &&
        time1 < time2
      ) {
        setStartTime(startTimeString);
        setEndTime(endTimeString);
        setDisable(false);
        console.log(7);
      } else if (
        startDay !== currentDate &&
        endDay !== currentDate &&
        startDay == endDay &&
        time1 >= time2
      ) {
        alert("Please select the correct time.");
        setDisable(true);
        console.log(8);
      } else if (startDay == "" && endDay == "") {
        alert("Please select a booking time.");
        setDisable(true);
        console.log(9);
      }
    }
  };
  // console.log(startTime);
  // console.log(endTime);

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
      <ButtonPrimary content="Book Now" width=" 320px" onClick={openModal} />
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
              order={false}
              allowClear={false}
            />
          </div>
          <div className="flex items-center justify-between mb-[3.75rem]">
            <ClockIcon />
            <TimePicker.RangePicker
              style={{ width: "92%", height: "48px" }}
              format="h:mm a"
              minuteStep={30}
              // defaultValue={[startInputTime, endInputTime]}
              onChange={handleTimeChange}
              inputReadOnly={true}
              allowClear={false}
              order={false}
            />
          </div>
          <div
            onClick={() => {
              setPetIds([]);
              setPetIdsNames({});
              setTotalAmount(0);
              navigate(`/booking/${userData.id}/${params.sitterId}`);
            }}
          >
            <ButtonPrimary
              width={"100%"}
              content={"Continue"}
              disabled={disable}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export const Modal = ({ isOpen, onClose, children }) => {
  const {
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    setTime1,
    setTime2,
    setStartDay,
    setEndDay,
  } = useBooking();
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
                setStartDate(""),
                  setEndDate(""),
                  setStartTime(""),
                  setEndTime(""),
                  setTime1(""),
                  setTime2(""),
                  setStartDay(""),
                  setEndDay(""),
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
