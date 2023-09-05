import { ButtonPrimary, ButtonSecondary } from "../systemdesign/Button";

function Confirmation(props) {
  return (
    <>
      <button className="btn" onClick={() => window.my_modal_3.showModal()}>
        open modal
      </button>
      <dialog id="my_modal_3" className="modal ">
        <form method="dialog" className="modal-box max-w-[400px] p-0">
          <div className="flex justify-between mx-6 my-4">
            <h3 className="text-headline4 ">{props.title}</h3>
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
              />
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
}

export default Confirmation;
