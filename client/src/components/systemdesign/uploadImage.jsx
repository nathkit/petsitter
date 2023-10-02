import { PlusIcon, UserIcon, PetIcon } from "./Icons";

export const UploadImage = (props) => {
  return (
    <>
      <div className="overflow-hidden w-[15rem] h-full rounded-full relative bg-gray-200 flex items-center justify-center ">
        {props.img ? (
          <img className="h-full w-full object-cover" src={props.img} alt="" />
        ) : (
          <UserIcon width="6.5rem" height="6.5rem" color="white" />
        )}
      </div>
      <label className="bg-etc-white w-[3.75rem] hover:shadow-lg h-[3.75rem] cursor-pointer absolute bottom-0 left-[11rem] flex items-center justify-center rounded-full">
        <PlusIcon color="#FF7037" />
        <input
          id="avatar"
          name="avatar"
          type="file"
          className="hidden"
          onChange={props.onChange ? props.onChange : null}
        ></input>
      </label>
    </>
  );
};

export const UploadPetImage = (props) => {
  return (
    <>
      <div
        className={`${
          props.cardWidth ? props.cardWidth : "w-[15rem]"
        } overflow-hidden  h-full rounded-full relative bg-gray-200 flex items-center justify-center`}
      >
        {props.img ? (
          <img className="h-full w-full object-cover" src={props.img} alt="" />
        ) : (
          <PetIcon width="6.5rem" height="6.5rem" color="white" />
        )}
      </div>
      <label
        className={`${props.hidden} bg-etc-white w-[3.75rem] hover:shadow-lg h-[3.75rem] cursor-pointer absolute bottom-0 left-[11rem] flex items-center justify-center rounded-full`}
      >
        <PlusIcon color="#FF7037" />
        <input
          id="avatar"
          name="avatar"
          type="file"
          className="hidden"
          onChange={props.onChange ? props.onChange : null}
        ></input>
      </label>
    </>
  );
};
