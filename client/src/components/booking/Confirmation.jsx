import { useNavigate } from "react-router-dom";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonGhost,
} from "../systemdesign/Button";
import usePosts from "../../hooks/usePost";
import { useBooking } from "../../contexts/BookingContext";
import { TrashIcon } from "../systemdesign/Icons";

function Confirmation(props) {
  const navigate = useNavigate();
  const { createBooking } = usePosts();

  return (
    <>
      <button onClick={() => window.my_modal_3.showModal()} type="button">
        <ButtonPrimary
          content={props.buttonName}
          width={props.buttonWidth}
          disabled={props.disabled}
          type="button"
        />
      </button>
      <dialog id="my_modal_3" className="modal ">
        <form
          method="dialog"
          className="modal-box max-w-[400px] p-0 bg-etc-white"
        >
          <div className="flex justify-between mx-6 my-4">
            <h3 className="text-headline4 ">{props.title}</h3>
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </div>
          <hr />
          <div className="m-6 ">
            <p className=" text-body2 mb-6">{props.description}</p>

            <div className=" flex justify-between">
              <ButtonSecondary
                width={props.secondaryWidth}
                content={props.secondaryContent}
              />
              <ButtonPrimary
                width={props.primaryWidth}
                content={props.primaryContent}
                onClick={props.onClick}
                type={props.type}
              />
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
}

export function Delete(props) {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => window.my_modal_3.showModal()}
        className="flex items-center justify-start"
      >
        <ButtonGhost
          content={props.buttonName}
          disabled={props.disabled}
          icon={TrashIcon}
          className="px-0"
        />
      </button>
      <dialog id="my_modal_3" className="modal ">
        <form
          method="dialog"
          className="modal-box max-w-[400px] p-0 bg-etc-white"
        >
          <div className="flex justify-between mx-6 my-4">
            <h3 className="text-headline4 text-etc-black">{props.title}</h3>
            <button className="btn btn-sm btn-circle btn-ghost ">✕</button>
          </div>
          <hr />
          <div className="m-6 ">
            <p className=" text-body2 mb-6">{props.description}</p>

            <div className=" flex justify-between">
              <ButtonSecondary
                width={props.secondaryWidth}
                content={props.secondaryContent}
              />
              <ButtonPrimary
                width={props.primaryWidth}
                content={props.primaryContent}
                onClick={props.onClick}
              />
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
}

export default Confirmation;
