import Lion from "../assets/lion.png";
import Image from "next/image";

const Banner = ({ name, childStyles, parentStyle, show }) => (
  <div
    className={`relative w-full flex items-center z-0 overflow-hidden nft-gradient ${parentStyle}`}
  >
    <p
      className={`font-bold text-5xl text-white font-poppins leading-70 ${childStyles}`}
    >
      {name}
    </p>
    <div className="absolute w-48 h-48 sm:w-32 sm:h-32 rounded-full -top-9 -left-16 -z-5 white-bg" />
    <div className="sm:hidden block">
      {show && (
        <Image
          src={Lion}
          alt="lion"
          width={800}
          height={800}
          objectFit="contain"
        />
      )}
    </div>
    <div className="absolute w-72 h-72 sm:w-56 sm:h-56 rounded-full -bottom-24 -right-14 -z-5 white-bg" />
  </div>
);

export default Banner;
