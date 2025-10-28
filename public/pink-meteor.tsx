import { SvgProps } from "./icons/BurgerMenu";

export const PinkMeteor = ({ className }: SvgProps) => {
  return (
    <svg
      width="278"
      height="410"
      viewBox="0 0 278 410"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_f_290_92)">
        <path
          d="M102.428 135.754C140.569 79.2074 217.328 64.287 273.874 102.428C330.42 140.569 345.341 217.328 307.2 273.874C269.059 330.421 192.3 345.341 135.754 307.2C79.2072 269.059 64.2867 192.3 102.428 135.754Z"
          fill="url(#paint0_linear_290_92)"
          fill-opacity="0.65"
        />
        <path
          d="M136.872 305.542C81.2413 268.019 66.5625 192.503 104.086 136.872C141.609 81.2416 217.125 66.5627 272.756 104.086C328.386 141.609 343.065 217.125 305.542 272.756C268.019 328.387 192.502 343.065 136.872 305.542Z"
          stroke="#DE96EB"
          stroke-width="4"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_290_92"
          x="0.30127"
          y="0.301544"
          width="409.025"
          height="409.025"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="40.5"
            result="effect1_foregroundBlur_290_92"
          />
        </filter>
        <linearGradient
          id="paint0_linear_290_92"
          x1="174.095"
          y1="220.642"
          x2="128.227"
          y2="64.6411"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EBD7EF" />
          <stop offset="1" stop-color="#EBD7EF" stop-opacity="0.14" />
        </linearGradient>
      </defs>
    </svg>
  );
};
