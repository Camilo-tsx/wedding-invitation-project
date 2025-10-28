"use client";
import Link from "next/link";
import { useState } from "react";

interface HeaderDesktopProps {
  isAuth: boolean;
}

export const HeaderDesktop = ({
  isAuth: initialIsAuth,
}: HeaderDesktopProps) => {
  const [isAuth, setIsAuth] = useState(initialIsAuth);

  const logOut = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Logout failed");
      }

      setIsAuth(false);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav
      className="hidden md:flex flex-1 items-center justify-between text-[#efefef]"
      style={{ fontFamily: "'Lora', serif" }}
    >
      {/* Opciones principales centradas */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 text-sm bg-[#323232]/30 backdrop-blur-md border border-white/10 px-5 py-3 rounded-full xl:text-lg xl:px-20 ">
        <Link href="/event/myevents">
          <strong className="cursor-pointer hover:text-[#ebd7ef] transition-colors">
            MIS EVENTOS
          </strong>
        </Link>
        <Link href="/event/create">
          <strong className="cursor-pointer hover:text-[#ebd7ef] transition-colors">
            CREAR EVENTO
          </strong>
        </Link>
        <Link href="/event/invitation/demo">
          <strong className="cursor-pointer hover:text-[#ebd7ef] transition-colors">
            VER DISEÑO
          </strong>
        </Link>
      </div>

      {/* Sesión a la derecha */}
      <div className="ml-auto flex flex-col gap-1 items-center text-[13px] xl:text-lg">
        {!isAuth ? (
          <>
            <Link href="/auth/login">
              <strong className="cursor-pointer hover:text-[#ebd7ef] transition-colors">
                INICIAR SESIÓN
              </strong>
            </Link>
            <Link href="/auth/register">
              <strong className="cursor-pointer hover:text-[#ebd7ef] transition-colors">
                REGISTRARME
              </strong>
            </Link>
          </>
        ) : (
          <button onClick={logOut}>
            <strong className="cursor-pointer hover:text-[#ebd7ef] transition-colors">
              CERRAR SESIÓN
            </strong>
          </button>
        )}
      </div>
    </nav>
  );
};
