"use client";
import Link from "next/link";
import { useState } from "react";
import "./Header.css";
import { BurgerMenuIcon } from "../../public/icons/BurgerMenu";
import { CloseIcon } from "../../public/icons/CloseIcon";

interface HeaderClientProps {
  isAuth: boolean;
}

export const HeaderClient = ({ isAuth: initialIsAuth }: HeaderClientProps) => {
  const [isAuth, setIsAuth] = useState(initialIsAuth);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

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

  const handleClick = () => {
    setToggleMenu(!toggleMenu);
    setHasOpened(true);
    console.log("toggle");
  };

  return (
    <>
      <BurgerMenuIcon
        className="size-7 text-[#efefef] m-3 block md:hidden"
        onClick={handleClick}
      />

      <div
        className={`md:hidden w-full rounded h-dvh fixed top-0 flex justify-center items-center flex-col bg-[#141414] ${
          toggleMenu
            ? "open-menu-animation"
            : hasOpened
            ? "close-menu-animation"
            : "hidden"
        }`}
      >
        <div onClick={handleClick} className="absolute right-7 top-7 flex">
          <strong
            style={{ fontFamily: "'Lora', serif" }}
            className="text-sm px-1"
          >
            CERRAR
          </strong>
          <CloseIcon className="size-5" />
        </div>

        <img
          className="absolute min-w-[117%] h-full z-[-1]"
          src="/METEROBG.png"
          alt="meteors"
        />

        <div
          style={{ fontFamily: "'Lora', serif" }}
          className="flex flex-col justify-center items-center text-3xl menu-container"
        >
          <Link href="/event/myevents" onClick={handleClick}>
            <strong>MIS EVENTOS</strong>
          </Link>
          <Link href="/event/create" onClick={handleClick}>
            <strong>CREAR EVENTO</strong>
          </Link>
          <Link href="/event/invitation/demo" onClick={handleClick}>
            <strong>VER DISEÑO</strong>
          </Link>
        </div>
        <div className="w-[80%] my-8 flex justify-center items-center border-b border-b-white border-b-[1px] p-1">
          <p style={{ fontFamily: "'Lora', serif" }} className="brand-text">
            MY WEDDING
          </p>
        </div>
        {!isAuth ? (
          <div
            style={{ fontFamily: "'Lora', serif" }}
            className="flex flex-col justify-center items-center text-m session-container"
          >
            <Link href="/auth/login" onClick={handleClick}>
              <strong>INICIAR SESIÓN</strong>
            </Link>
            <Link href="/auth/register" onClick={handleClick}>
              <strong>REGISTRARSE</strong>
            </Link>
          </div>
        ) : (
          <div
            style={{ fontFamily: "'Lora', serif" }}
            className="flex flex-col justify-center items-center text-m session-container"
          >
            <strong onClick={logOut}>CERRAR SESIÓN</strong>
          </div>
        )}
      </div>
    </>
  );
};
