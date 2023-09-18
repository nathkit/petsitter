import { PhoneIcon } from "../../systemdesign/Icons";
import ReviewButton from "../UserReview/ReviewButton";

export function WaitingforConfirm() {
  return (
    <div className="text-gray-400 text-body3 flex-1 w-auto bg-gray-100 p-4 mt-9 rounded-lg">
      <h3>Waiting Pet Sitter for Confirm booking</h3>
    </div>
  );
}

export function WaitingforService() {
  return (
    <div className="text-gray-400 text-body3 flex-1 w-auto bg-gray-100 p-4 mt-9 rounded-lg">
      <h3>Pet Sitter confirm booking waiting for service</h3>
    </div>
  );
}

export function InService() {
  return (
    <div className="text-gray-400  text-body3 flex justify-between w-auto bg-gray-100 p-4 mt-9 rounded-lg">
      <div className=" flex justify-center items-center">
        <h3>Your pet is already in Pet Sitter care!</h3>
      </div>
      <button className=" flex bg-orange-100 rounded-2xl w-12 h-12 items-center justify-center">
        <a href="tel:+063xxxxxxx">
          <PhoneIcon color="#ff7037" />
        </a>
      </button>
    </div>
  );
}

export function Success() {
  return (
    <div className="text-green-500 text-body3 flex-1 w-auto bg-green-100 p-4 mt-9 rounded-lg flex justify-between">
      <div>
        <h3>Success date :</h3> {/* Fixed typo here: Succes to Success */}
        <h3>Tue, 13 Apr 2023 | 8.40 PM</h3>
      </div>
      <div>
        <ReviewButton />
      </div>
    </div>
  );
}

export function Canceled() {
  return (
    <div className="text-etc-red text-body3 flex-1 w-auto bg-pink-100 p-4 mt-9 rounded-lg">
      <h3>Your booking is Canceled</h3>
    </div>
  );
}