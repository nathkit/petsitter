function Button(props) {
  return (
    <button className="inline-flex justify-center items-center py-3 px-6 rounded-[99px]">
      {props.content}
    </button>
  );
}
export default Button;
