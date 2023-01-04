import { useEffect, useState, useRef, useContext } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

import { CreatorCard, NFTCard, Loader, SearchBar, Banner } from "../components";
import { NFTContext } from "../context/NFTContext";
import { getCreators } from "../utils/getTopCreators";
import { shortenAddress } from "../utils/shortenAddress";
import images from "../assets";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

const Home = () => {
  const { fetchNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideButtons, setHideButtons] = useState(false);
  const [activeSelect, setActiveSelect] = useState("Recently Added");

  const scrollRef = useRef(null);
  const parentRef = useRef(null);

  const { theme } = useTheme();

  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items?.reverse());
      console.log(items);
      setNftsCopy(items);
      setIsLoading(false);
    });
  }, [currentAccount]);

  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case "Price (low to high)":
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case "Price (high to low)":
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case "Recently added":
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);

  const onHandleSearch = (value) => {
    const filteredNfts = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNfts.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNfts);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  // check if scrollRef container is overfilling its parentRef container
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth)
      return setHideButtons(false);
    return setHideButtons(true);
  };

  // if window is resized
  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);

    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  });

  const creators = nfts ? getCreators(nfts) : [];

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <Head>
        <title>Home | NFTKastle</title>
      </Head>
      <div className="w-full minmd:w-4/5">
        <Banner
          name={
            <>
              Discover, collect, stake, draw and sell <br /> extraordinary NFTs
            </>
          }
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          show
        />

        {!isLoading && !nfts?.length ? (
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            That&apos;s weird... No NFTs for sale!
          </h1>
        ) : isLoading ? (
          <Loader />
        ) : (
          <>
            <div>
              <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
                Best Creators
              </h1>

              <div
                className="relative flex-1 max-w-full flex mt-3"
                ref={parentRef}
              >
                <div
                  className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
                  ref={scrollRef}
                >
                  {creators?.slice(0, 10).map((creator, i) => (
                    <CreatorCard
                      key={creator.seller}
                      rank={i + 1}
                      creatorImage={images[`creator${i + 1}`]}
                      creatorName={shortenAddress(creator.seller)}
                      creatorEths={creator.sumall}
                    />
                  ))}
                  {!hideButtons && (
                    <>
                      <div
                        onClick={() => handleScroll("left")}
                        className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                      >
                        <Image
                          src={images.left}
                          layout="fill"
                          objectFit="contain"
                          alt="left_arrow"
                          className={
                            theme === "light" ? "filter invert" : undefined
                          }
                        />
                      </div>
                      <div
                        onClick={() => handleScroll("right")}
                        className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                      >
                        <Image
                          src={images.right}
                          layout="fill"
                          objectFit="contain"
                          alt="left_arrow"
                          className={
                            theme === "light" ? "filter invert" : undefined
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                  Hot Bids
                </h1>

                <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
                  <SearchBar
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    handleSearch={onHandleSearch}
                    clearSearch={onClearSearch}
                  />
                </div>
              </div>
              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                {nfts.slice(0, 10).map((nft) => (
                  <NFTCard key={nft.tokenId} nft={nft} />
                ))}
              </div>
              <div className="w-full justify-center items-center flex mt-4">
                <Link href="/market-place">
                  <Button
                    as="a"
                    backgroundColor="#3198FE"
                    border="1px solid #3198FE"
                    color="white"
                    _hover={{
                      backgroundColor: "#000",
                      border: "1px solid #3198FE",
                      color: "white",
                    }}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    w={{ base: "full", sm: "auto" }}
                    mb={{ base: 2, sm: 0 }}
                    size="lg"
                    cursor="pointer"
                  >
                    View more on the market place
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
