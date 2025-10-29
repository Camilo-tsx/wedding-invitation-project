import { ScrollIcon } from "../icons/Scrollbutton";
import Link from "next/link";
import "../styles/HeroText.css";

export const Hero = () => {
  return (
    <main className="relative flex flex-col justify-center my-25 items-center justify-center z-[10]">
      <h2
        style={{ fontFamily: "'Parisienne', cursive" }}
        className="text-[#efefef] relative z-[10] text-4xl md:text-6xl bg-transparent"
      >
        <span className="text-fill inline-block">My Wedding</span>
        <img
          src="/pinkline.png"
          alt="line"
          className="absolute left-0 right-0 top-8 md:top-13 z-[-1] line-fill w-full h-auto"
        />
      </h2>
      <h1
        style={{ fontFamily: "'Lora', serif", fontStyle: "italic" }}
        className="text-[#efefef] my-5 text-xl md:text-2xl text-center hero-opacity-animation"
      >
        Invitaciones digitales
        <br /> para tu boda
      </h1>
      <div className="w-80 md:w-[65%] h-[1px] bg-[#efefef] my-5 md:my-8 hero-opacity-animation"></div>
      <Link href="/event/invitation/demo">
        <button className="w-60 md:w-90 md:text-xl text-[#ebd7ef] p-2 md:p-3 border-[2px] border-[#ebd7ef] rounded-3xl my-10 hero-opacity-animation hover:bg-[#ebd7ef] hover:text-black transition-colors duration-200 cursor-pointer">
          <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic" }}>
            Descubre el diseño
          </p>
        </button>
      </Link>
      <div className="flex flex-col aling-center justify-center hero-opacity-animation">
        <p
          style={{ fontFamily: "'Lora', serif", fontStyle: "italic" }}
          className="text-[#efefef] md:text-xl my-2 flex aling-center justify-center"
        >
          scroll
        </p>

        <ScrollIcon className="text-[#efefef] size-12 md:size-15" />
      </div>
    </main>
  );
};
