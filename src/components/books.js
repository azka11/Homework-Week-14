import { Heading, Text, Box } from "@chakra-ui/react";
import Link from "next/link";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link href={`bookdetail/${id}`}>
      <Box
        maxW={"400px"}
        minW={"200px"}
        maxH={"550px"}
        minH={"450px"}
        bgColor="gray.300"
        _hover={{
          transform: "scale(1.1)",
          transitionDuration: "0.4s",
          transitionTimingFunction: "ease-in-out",
          boxShadow: "dark-lg",
          border: "4px",
          borderColor: "blue.400",
          borderRadius: "10px",
        }}
        backgroundColor="bisque"
      >
        <Box>
          <Heading size="xs" textAlign="center" m="5px" pt="5px" height="50px">
            {title}
            <br />({year})
          </Heading>
        </Box>
        <Box
          align="center"
          bgImage={`url(http://localhost:3000/${image})`}
          bgSize="cover"
          bgPos="center"
          h={"xs"}
        ></Box>
        <Box>
          <Text
            fontSize="x-small"
            fontStyle="italic"
            mt="10px"
            p="10px"
            textAlign="start"
          >
            Author : {author}
            <br />
            Publisher : {publisher}
          </Text>
        </Box>
      </Box>
    </Link>
  );
}
