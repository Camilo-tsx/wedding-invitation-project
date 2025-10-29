"use client";
import { useObserver } from "@/shared/components/hooks/useObserver";
import { Heart } from "../icons/Heart";
import { useEffect } from "react";
import { InstagramLogo } from "../icons/Instagram";
import { WhatsappLogo } from "../icons/Whatsapp";

export const Footer = () => {
  // declare the elements to observe
  useEffect(() => {
    const element = document.querySelectorAll(".heart");
    useObserver(element, "heart-fill");
  }, []);

  useEffect(() => {
    const element = document.querySelectorAll(".contact");
    useObserver(element, "fade");
  }, []);

  return (
    <footer className="relative w-full flex flex-col min-h-[400px]">
      <div className="w-full h-100 flex items-center justify-center container-div flex-col">
        <Heart className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 my-3 size-65 md:size-80 heart z-[-1]" />
        <p
          style={{ fontFamily: "'Parisienne', cursive" }}
          className="text-2xl md:text-3xl text-white contact"
        >
          Contactanos
        </p>
        <div className="flex flex-row w-full justify-center contact">
          <InstagramLogo />
          <WhatsappLogo />
        </div>
      </div>
    </footer>
  );
};
