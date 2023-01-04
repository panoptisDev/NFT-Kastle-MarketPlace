import { useEffect, useState, useContext } from "react";
import Head from "next/head";
import { NFTContext } from "../context/NFTContext";
import { Loader, NFTCard, SearchBar, Banner } from "../components";

const MyNFTs = () => {
  const { fetchNFTs } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSelect, setActiveSelect] = useState("Recently Added");

  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items?.reverse());
      setNftsCopy(items);
      setIsLoading(false);
    });
  }, []);

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
    if (nfts?.length && nftsCopy?.length) {
      setNfts(nftsCopy);
    }
  };

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <Head>
        <title>MarketPlace</title>
      </Head>
      {!isLoading && nfts?.length === 0 ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
            No NFTs owned
          </h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <Head>
            <title>MarketPlace</title>
          </Head>
          <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
              clearSearch={onClearSearch}
            />
          </div>
          <div className="mt-3 w-full flex flex-wrap">
            {nfts?.map((nft) => (
              <NFTCard key={`nft-${nft.tokenId}`} nft={nft} onProfilePage />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
