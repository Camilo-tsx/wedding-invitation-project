"use client";
import { useObserver } from "@/shared/components/hooks/useObserver";
import { useEffect } from "react";
import "../styles/ServiceOverview.css";
import { overviewFeatures } from "../constants";

export const ServiceOverview = () => {
  useEffect(() => {
    const element = document.querySelectorAll(".overview-item");
    useObserver(element, "is-visible");
  }, []);
  return (
    <section className="w-full h-auto z-[10] bg-gradient">
      {overviewFeatures.map((s, i) => (
        <div
          key={i}
          className="min-h-[200px] flex items-center justify-center flex-col overview-item"
        >
          <h2
            style={{ fontFamily: "'Parisienne', cursive" }}
            className="text-2xl md:text-4xl text-[#EBD7EF]"
          >
            {s.title}
          </h2>
          <h3
            style={{ fontFamily: "'Lora', serif", fontStyle: "italic" }}
            className="text-[#efefef] text-center text-xl md:text-2xl z-[20]"
          >
            {s.lines.map((t, j) => (
              <span key={j}>
                {t}
                <br />
              </span>
            ))}
          </h3>
        </div>
      ))}
    </section>
  );
};
