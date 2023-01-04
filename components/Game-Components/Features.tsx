import { Flex, Box, Text, Grid, Link } from "@chakra-ui/react";
import Step from "./Step";
import { FaTwitter } from "react-icons/fa";
import { BsFillFilePersonFill } from "react-icons/bs";
import { ImFire } from "react-icons/im";
import { RiLockFill } from "react-icons/ri";

const features = [
  {
    title: "More Fun",
    description:
      "With the more modern and feature rich wrong side, you can have more fun than playing any other game !",
    icon: <ImFire />,
  },
  {
    title: "Unique NFT",
    description:
      "At the end of every month if you win, you can mint a unique NFT which is in the blockchain !",
    icon: <BsFillFilePersonFill />,
  },
  {
    title: "No Cheating",
    description:
      "It is not possible to cheat, you can only win if you are the top scorer on the leaderboard !",
    icon: <RiLockFill />,
  },
  {
    title: "Tweet By A Click",
    description:
      "Tweet your wins everyday with a single click, no more coping and pasting !",
    icon: <FaTwitter />,
  },
];

const Features = () => {
  return (
    <Box
      id="steps"
      position="relative"
      zIndex={2}
      w="full"
      opacity="0.97"
      bg="linear-gradient(292.63deg, #00254A -20.23%, #000012 88.04%)"
      mx="auto"
      py="20"
    >
      <Box mb="10">
        <Text color="white" align="center" fontWeight="bold" fontSize="4xl">
          what you will enjoy
        </Text>
      </Box>
      <Grid
        mt="2"
        px="10"
        maxW="6xl"
        mx="auto"
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap="10"
        w="full"
      ></Grid>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-4">
        {features.map((feature, i) => (
          <Step key={i} {...feature} />
        ))}
      </div>
    </Box>
  );
};

export default Features;
