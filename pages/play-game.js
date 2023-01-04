import Features from "../components/Game-Components/Features";
import Intro from "../components/Game-Components/Intro";
import Swiper from "../components/Swiper";
import Head from "next/head";

const Game = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-nft-dark">
      <Head>
        <title>Play Game</title>
      </Head>
      <Swiper />
      <Intro />
      <Features />
    </div>
  );
};

export default Game;
