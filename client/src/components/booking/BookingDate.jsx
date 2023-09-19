import { CalendarIcon, ClockIcon, Close } from "../systemdesign/Icons";
import { ButtonPrimary } from "../systemdesign/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import dayjs from "dayjs";
import { useAuth } from "../../contexts/authentication";
import { useParams } from "react-router-dom";

import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

function BookingDate() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dateFormat = "DD MMM YYYY";
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const isContinueDisabled = !startDate || !endDate || !startTime || !endTime;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const disabledDate = (current) => {
    return current && current.isBefore(dayjs(), "day");
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
  console.log(`${startDate}  ${startTime}`);
  console.log(`${endDate}  ${endTime}`);

  return (
    <div className="">
      <ButtonPrimary content="Book Now" width=" 250px" onClick={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="w-full h-full ">
          <p className="mb-6 text-body1 text-start">
            Select date and time you want to schedule the service.
          </p>
          <div className="mb-6 flex items-center justify-between">
            <CalendarIcon />
            <RangePicker
              style={{ width: "92%", height: "48px" }}
              onChange={handleDateChange}
              format={dateFormat}
              disabledDate={disabledDate}
              defaultValue={[dayjs(), dayjs()]}
            />
          </div>
          <div className="flex items-center justify-between mb-[3.75rem]">
            <ClockIcon />
            <input
              id="startTime"
              type="time"
              className="input input-bordered w-52 hover:border-orange-500 focus:border-orange-500 "
              onChange={(e) => setStartTime(e.target.value)}
            />
            -
            <input
              id="endTime"
              type="time"
              className="input input-bordered w-52 hover:border-orange-500 focus:border-orange-500"
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div
            onClick={() => {
              if (!isContinueDisabled) {
                navigate(`/booking/${userData.id}/${params.sitterId}`);
              }
            }}
          >
            <ButtonPrimary
              width={"100%"}
              content={"Continue"}
              disabled={isContinueDisabled}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export const Modal = ({ isOpen, onClose, children }) => {
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
            <Close onClick={onClose} />
          </div>
          <div className="m-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BookingDate;
