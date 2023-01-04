import { Spinner } from "@chakra-ui/react";

const Loader = () => (
  <div className="flexCenter h-[40vh] w-full my-4">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </div>
);

export default Loader;
