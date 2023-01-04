import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Confetti from "react-confetti";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { Input, Loader } from "../components";
import { useToast, Icon, Button, Spinner } from "@chakra-ui/react";
import { NFTContext } from "../context/NFTContext";
import * as Hi from "react-icons/hi";

const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
const projectIdAndSecret = `${projectId}:${projectSecret}`;

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
      "base64"
    )}`,
  },
});

const MINT_STAGES = [
  "Adding the NFT to the blockchain",
  "Putting the token on the marketplace",
];

const MintNft = () => {
  const [imageURL, setImageURL] = useState("");
  const { createPersonalNFT, connectWallet, currentAccount } =
    useContext(NFTContext);
  const [loading, setLoading] = useState(false);
  const [mintStage, setMintStage] = useState(-1);
  const [errorStage, setErrorStage] = useState(-1);
  const [fileUrl, setFileUrl] = useState(null);
  const [fetch, setFetch] = useState(true);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();
  const toast = useToast();

  const uploadToInfura = async (file) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://nft-kastle.infura-ipfs.io/ipfs/${added.path}`;

      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  function makeblob(dataURL) {
    const BASE64_MARKER = ";base64,";
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  useEffect(() => {
    if (!router.isReady) return;

    setImageURL(router.query);
    uploadToInfura(makeblob(router.query.baseImage));
    setFetch(false);
  }, [router.isReady]);

  const mintNFT = async () => {
    setLoading(true);
    setMintStage(1);
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) {
      toast({
        title: "Details not complete",
        description: "Enter the details carefully",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    /* first, upload to IPFS */
    const data = JSON.stringify({ name, description, image: fileUrl });
    try {
      const added = await client.add(data);
      const url = `https://nft-kastle.infura-ipfs.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      await createPersonalNFT(url, formInput.price);
      setLoading(false);
      setMintStage(2);
    } catch (error) {
      console.log("Error uploading file: ", error);
      setErrorStage(1);
    }
  };

  const Minting = () => (
    <>
      <div className="flex min-h-screen w-full text-white p-5 justify-center items-center">
        <div className="pl-10 pr-10 pb-10 pt-0 bg-gray rounded-lg ">
          <div className="flex flex-col min-h-screen w-full text-white p-5 justify-center items-center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <h2 className="text-2xl">Minting...</h2>
            <p className="text-sm leading-relaxed text-gray-600">
              Your NFT is being minted!
            </p>
            <p className="text-sm leading-relaxed text-gray-600">
              This may take a while :)
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const Minted = () => (
    <div className="flex  min-h-screen w-full text-white justify-center items-center">
      <div className=" space-y-4 p-10 bg-gray rounded-lg">
        <div className="space-y-2">
          <h2 className="text-2xl">Minted! 🎉</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Yayy! Your NFT has been minted.
          </p>
        </div>
        <div className=" gap-3 justify-center items-center w-full sm:flex-col flex pt-5">
          <Link href="/draw">
            <Button
              as="a"
              backgroundColor="transparent"
              border="1px solid #2d89e6"
              _hover={{
                backgroundColor: "#000",
                border: "1px solid #2d89e6",
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
              Go to draw
            </Button>
          </Link>
          <a
            href={imageURL?.baseImage}
            download={imageURL?.downloadLink ? imageURL?.downloadLink : fileUrl}
          >
            <Button
              rightIcon={<Icon as={Hi.HiDownload} w={5} h={5} />}
              colorScheme="teal"
              variant="solid"
              w={{ base: "full", sm: "auto" }}
              size="lg"
              cursor="pointer"
            >
              Download
            </Button>
          </a>
        </div>
      </div>
    </div>
  );

  if (fetch) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Mint NFT</title>
      </Head>
      <div>
        {mintStage === MINT_STAGES.length && (
          <Confetti className="w-full h-screen" recycle={true} />
        )}
        {mintStage === 2 ? (
          <div className="flex w-full items-center">
            <Minted />
          </div>
        ) : mintStage === 1 ? (
          <div className="flex items-center">
            <Minting />
          </div>
        ) : (
          <div className="flex w-full sm:flex-col mt-10 sm:mt-5 sm:pl-5 sm:pr-5 pl-20 pr-20 pb-10 justify-between">
            <div className="rounded-md">
              {imageURL?.baseImage && (
                <Image
                  className="rounded-md"
                  src={imageURL?.baseImage}
                  height={500}
                  width={500}
                  objectFit="contain"
                />
              )}
            </div>
            <div className="w-[500px] md:ml-10 sm:ml-0 sm:w-full">
              <Input
                inputType="input"
                title="Name"
                placeholder="Asset Name"
                handleClick={(e) =>
                  updateFormInput({ ...formInput, name: e.target.value })
                }
              />

              <Input
                inputType="textarea"
                title="Description"
                placeholder="Asset Description"
                handleClick={(e) =>
                  updateFormInput({ ...formInput, description: e.target.value })
                }
              />

              <Input
                inputType="number"
                title="Price"
                placeholder="Asset Price"
                handleClick={(e) =>
                  updateFormInput({ ...formInput, price: e.target.value })
                }
              />

              <div className="mt-7 w-full flex justify-end">
                {currentAccount ? (
                  <Button
                    as="a"
                    onClick={mintNFT}
                    backgroundColor="#2d89e6"
                    border="1px solid #2d89e6"
                    _hover={{
                      backgroundColor: "#000",
                      border: "1px solid #2d89e6",
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
                    Create item
                  </Button>
                ) : (
                  <Button
                    as="a"
                    onClick={connectWallet}
                    backgroundColor="#2d89e6"
                    border="1px solid #2d89e6"
                    _hover={{
                      backgroundColor: "#000",
                      border: "1px solid #2d89e6",
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
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MintNft;
