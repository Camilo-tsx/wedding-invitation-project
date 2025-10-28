import RegisterForm from "./RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <picture>
        <source media="(min-width: 1024px)" srcSet="/desktbg.png" />
        <source media="(min-width: 768px)" srcSet="/tabletbg.png" />
        <img
          src="/sessionbg.png"
          alt="comet"
          className="absolute left-0 top-0 w-full h-[100dvh] object-cover"
        />
      </picture>

      <div className="relative bg-[#323232]/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg w-85 min-h-[400px] flex flex-col justify-center items-center">
        <strong
          style={{ fontFamily: "'Lora', serif" }}
          className="text-white text-2xl mb-5"
        >
          Regístrate
        </strong>

        <RegisterForm />
      </div>
    </div>
  );
};
