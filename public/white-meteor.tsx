import { SvgProps } from "./icons/BurgerMenu";

export const WhiteMeteor = ({ className }: SvgProps) => {
  return (
    <svg
      width="291"
      height="410"
      viewBox="0 0 291 410"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_290_91)">
        <ellipse
          cx="86.4057"
          cy="205.142"
          rx="123.5"
          ry="123.5"
          transform="rotate(47 86.4057 205.142)"
          fill="url(#paint0_linear_290_91)"
          fill-opacity="0.65"
        />
        <path
          d="M175.265 122.28C221.029 171.355 218.344 248.238 169.269 294.002C120.193 339.766 43.3101 337.081 -2.45377 288.005C-48.2176 238.93 -45.5328 162.047 3.54291 116.283C52.6186 70.5192 129.501 73.204 175.265 122.28Z"
          stroke="white"
          stroke-width="4"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_290_91"
          x="-118.095"
          y="0.642029"
          width="409.001"
          height="409.001"
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
            result="effect1_foregroundBlur_290_91"
          />
        </filter>
        <linearGradient
          id="paint0_linear_290_91"
          x1="61.1627"
          y1="153.152"
          x2="186.424"
          y2="256.833"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D9D9D9" />
          <stop offset="1" stop-color="#D9D9D9" stop-opacity="0.14" />
        </linearGradient>
      </defs>
    </svg>
  );
};
