import Link from "next/link";
import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderClient } from "./HeaderClient";
import { checkUiStatus } from "@/core/services/auth/checkUiStatus";

export const Header = async () => {
  const checked = await checkUiStatus();
  const isAuth = !!checked;

  return (
    <header className="absolute top-0 left-0 w-full flex flex-row justify-between z-[99] px-3 lg:px-10 ">
      <div className="flex-shrink-0">
        <Link href="/">
          <p
            className="text-[#efefef] text-xl py-5 xl:text-3xl"
            style={{ fontFamily: "'Parisienne', cursive" }}
          >
            My Wedding
          </p>
        </Link>
      </div>

      <HeaderClient isAuth={isAuth} />
      <HeaderDesktop isAuth={isAuth} />
    </header>
  );
};
