import { useContext } from "react";
import { NFTContext } from "../../context/NFTContext";
import { FC } from "react";
import Button from ".././Button";
import Link from "next/link";

const Intro: FC = () => {
  const { connectWallet, currentAccount } = useContext(NFTContext);

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-3 pb-8 font-josefin">
        <div className="my-5 flex dark:text-white text-nft-black-1 select-none justify-center space-x-2 text-center text-2xl font-bold uppercase md:space-x-2">
          Wrong Side
        </div>

        <div className="mt-10 text-center capitalize lg:mt-12">
          <h1 className="text-3xl font-bold text-zinc-700 dark:text-zinc-100">
            a game that you will love
          </h1>
          <p className="mt-1 text-lg text-zinc-600 dark:text-zinc-400">
            The fully featured web3 friendly modern wronge side game that you
            can&apos;t cheat 😉
          </p>
        </div>

        <div className="mt-8 flex justify-center text-white">
          {currentAccount ? (
            <Link
              passHref
              href={{
                pathname: "/wrong-side",
                query: { user: currentAccount },
              }}
            >
              <div className="nft-gradient cursor-pointer rounded-md text-sm minlg:text-lg py-2 px-6 minlg:py-4 minlg:px-8 font-poppins font-semibold text-white">
                Play Game
              </div>
            </Link>
          ) : (
            <Button
              btnName="Connect wallet"
              btnType="primary"
              classStyles="mx-2 rounded-lg"
              handleClick={connectWallet}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Intro;
