import Link from "next/link";
import imgLogo from "@/assets/logo.svg";
import Image from "next/image";

// Components
import SearchBar from "./SearchBar";
import CartButton from "./CartSide";
import AccountContainer from "./AccountContainer";

const Header = () => {
  return (
    <>
      <header className="bg-[#181F2B] py-6 ">
        <div className="container mx-auto flex flex-wrap md:flex-nowrap gap-4 items-center justify-between text-white">
          <Link href="/"  className="order-1 w-40 block">
            <Image src={imgLogo} alt="Dukamarket logo" />
          </Link>

          <SearchBar />
          <div className="flex gap-4 md:gap-8 items-center text-sm order-2 md:order-3">
            <AccountContainer />
            <CartButton />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
