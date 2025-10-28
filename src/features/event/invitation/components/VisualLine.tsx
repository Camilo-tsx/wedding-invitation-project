import { ReactNode } from "react";

interface VisualLineProps {
  firstItem: string | ReactNode;
  secondItem: string | ReactNode;
}

export const VisualLine = ({ firstItem, secondItem }: VisualLineProps) => {
  return (
    <div className="relative w-[2px] h-[300px] bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]">
      <div className="absolute top-[25%] left-1/2 -translate-x-full flex items-center gap-2">
        <span
          style={{ fontFamily: "'Parisienne', cursive" }}
          className="text-2xl text-white"
        >
          {firstItem}
        </span>
        <div className="w-[40px] h-[2px] bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"></div>
      </div>

      <div className="absolute top-[65%] left-1/2 flex items-center gap-2">
        <div className="w-[40px] h-[2px] bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"></div>
        <span
          style={{ fontFamily: "'Parisienne', cursive" }}
          className="text-2xl text-white"
        >
          {secondItem}
        </span>
      </div>
    </div>
  );
};
