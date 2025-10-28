export const VisualTextSection = () => {
  return (
    <section className="relative w-full flex items-start min-h-[560px] m-0 p-0 overflow-hidden">
      <img
        className="absolute left-1/2 -translate-x-1/2 top-0 z-[-1] w-80 md:w-100"
        src="/diamond.png"
        alt="heart"
      />

      <div className="flex flex-col justify-center items-center w-full">
        <h3
          style={{ fontFamily: "'Parisienne', cursive" }}
          className="text-4xl md:text-5xl text-[#efefef]"
        >
          Tu boda es unica
        </h3>
        <div className="w-80 bg-[#323232]/40 rounded-xl p-2 backdrop-blur-sm">
          <p
            style={{ fontFamily: "'Lora', serif", fontStyle: "italic" }}
            className="text-center text-[#efefef] md:text-xl"
          >
            y tu invitacion <br /> tiene que estar a la altura
          </p>
        </div>
      </div>
    </section>
  );
};
