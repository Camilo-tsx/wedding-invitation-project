type ScrollIconProps = {
  className?: string;
};

export const ScrollIcon = ({ className }: ScrollIconProps) => {
  return (
    <svg
      width="40"
      height="33"
      viewBox="0 0 40 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="20"
        cy="16"
        r="12.75"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M19.8232 22.0375C19.9209 22.1351 20.0791 22.1351 20.1768 22.0375L21.7678 20.4465C21.8654 20.3488 21.8654 20.1905 21.7678 20.0929C21.6701 19.9953 21.5118 19.9953 21.4142 20.0929L20 21.5071L18.5858 20.0929C18.4882 19.9953 18.3299 19.9953 18.2322 20.0929C18.1346 20.1905 18.1346 20.3488 18.2322 20.4465L19.8232 22.0375ZM20 11H19.75L19.75 21.8607H20H20.25L20.25 11H20Z"
        fill="currentColor"
      />
    </svg>
  );
};
