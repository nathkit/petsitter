export function Variant3(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!props.width ? 20 : props.width}
      height={!props.height ? 20 : props.height}
      viewBox="0 0 20 20"
      fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0282 2.81381C12.6214 2.3954 11.9619 2.3954 11.5551 2.81381L5.3051 9.24239C4.8983 9.66081 4.8983 10.3392 5.3051 10.7576L11.5551 17.1862C11.9619 17.6046 12.6214 17.6046 13.0282 17.1862C13.435 16.7678 13.435 16.0894 13.0282 15.671L7.51481 10L13.0282 4.32904C13.435 3.91062 13.435 3.23223 13.0282 2.81381Z"
        fill={
          !props.hoverColor
            ? !props.color
              ? "#AEB1C4"
              : props.color
            : props.hoverColor
        }
      />
    </svg>
  );
}

export function Variant4(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!props.width ? 20 : props.width}
      height={!props.height ? 20 : props.height}
      viewBox="0 0 20 20"
      fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.97307 2.81381C7.37986 2.3954 8.03941 2.3954 8.44621 2.81381L14.6962 9.24239C15.103 9.6608 15.103 10.3392 14.6962 10.7576L8.44621 17.1862C8.03941 17.6046 7.37986 17.6046 6.97307 17.1862C6.56627 16.7678 6.56627 16.0894 6.97307 15.671L12.4865 10L6.97307 4.32904C6.56627 3.91062 6.56627 3.23223 6.97307 2.81381Z"
        fill={
          !props.hoverColor
            ? !props.color
              ? "#AEB1C4"
              : props.color
            : props.hoverColor
        }
      />
    </svg>
  );
}
