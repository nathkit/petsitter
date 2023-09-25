import { ArrowLeftIcon, Dot } from "../../systemdesign/Icons";
import { ButtonPrimary } from "../../systemdesign/Button";
import { ButtonSecondary } from "../../systemdesign/Button";

function SubNavbar(props) {
  return (
    <div className="flex w-[1120px] h-[48px] justify-between ">
      <div className="flex justify-center items-center">
        <ArrowLeftIcon color="#7B7E8F" />
        <h3 className="pl-2.5 pr-6">{props.userFullName}</h3>
        <div className="flex justify-center items-center gap-2">
          <Dot
            color={`${
              props.status === "In service"
                ? "#76D0FC"
                : props.status === "Waiting for confirm"
                ? "#FA8AC0"
                : props.status === "Waiting for service"
                ? "#FFCA62"
                : props.status === "Success"
                ? "#1CCD83"
                : props.status === "Canceled"
                ? "#EA1010"
                : ""
            }`}
          />
          <div
            className={` text-body2 ${
              props.status === "In service"
                ? "text-blue-500"
                : props.status === "Waiting for confirm"
                ? "text-pink-500"
                : props.status === "Waiting for service"
                ? "text-yellow-200"
                : props.status === "Success"
                ? "text-green-500"
                : props.status === "Canceled"
                ? "text-etc-red"
                : ""
            }`}
          >
            {props.status}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {props.status === "Waiting for confirm" && (
          <>
            <ButtonSecondary content="Reject Booking" width="160px" />
            <ButtonPrimary content="Confirm Booking" width="175px" />
          </>
        )}
        {props.status === "Waiting for service" && (
          <ButtonPrimary content="In service" />
        )}
        {props.status === "In service" && <ButtonPrimary content="Success" />}
        {props.status === "Success" && <ButtonPrimary content="Review" />}
      </div>
    </div>
  );
}

export default SubNavbar;
