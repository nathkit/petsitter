export function ButtonPrimary(props) {
  return (
    <button
      className={`inline-flex justify-center items-center py-3 px-6 rounded-full gap-2 border-none
       bg-orange-500 text-etc-white
        hover:bg-orange-400 active:bg-orange-600
         disabled:bg-gray-200 disabled:text-gray-300`}
      style={{ width: props.width, height: "24px" }}>
      {props.content}
    </button>
  );
}
export function ButtonSecondary(props) {
  return (
    <button
      className={`inline-flex justify-center items-center py-3 px-6 rounded-full gap-2 border-none
        bg-orange-100 text-orange-500
        hover:text-orange-400 active:text-orange-600
         disabled:bg-gray-200 disabled:text-gray-100`}
      style={{ width: props.width, height: "24px" }}>
      {props.content}
    </button>
  );
}
export function ButtonGhost(props) {
  return (
    <button
      className={`inline-flex justify-center items-center py-1 px-0.5 rounded-full gap-1 border-none
      bg-transparent text-orange-500
        hover:text-orange-400 active:text-orange-600
         disabled:text-gray-200`}
      style={{ width: props.width, height: "24px" }}>
      {props.content}
    </button>
  );
}
export function ButtonSocial(props) {
  return (
    <button
      className={`inline-flex justify-center items-center py-3 px-6 rounded-full gap-2 border-none
        bg-gray-100 text-gray-600
       hover:text-gray-400 active:text-gray-600
         disabled:text-gray-600`}
      style={{ width: props.width, height: "24px" }}>
      {props.icon ? <props.icon /> : null}
      {props.content}
    </button>
  );
}
