import {
  Stack,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const AccordionSection = ({ title, children }) => {
  return (
    <AccordionItem
      className="dark:text-white text-nft-black-1"
      borderRadius={5}
    >
      <h2>
        <AccordionButton
          _expanded={{ borderRadius: "5" }}
          style={{ backgroundColor: "#e5eafe" }}
        >
          <Box
            flex="1"
            textAlign="left"
            className="text-nft-black-1"
            fontSize="18"
            fontWeight="600"
          >
            {title}
          </Box>
          <AccordionIcon color="blue.700" />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Stack>{children}</Stack>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AccordionSection;
