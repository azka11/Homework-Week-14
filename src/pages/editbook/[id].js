// import { useState, useEffect } from "react";
import BookForm from "@/components/bookForm";
// import { useRouter } from "next/router";
import { Box, Center } from "@chakra-ui/react";
import Navbar from "@/components/navbar";

export default function EditBook() {
  return (
    <>
      <Navbar />
      <Center background="linear-gradient(to top, #051937, #2d4b62, #64818b, #a7b9b9, #eff2f1)">
        <Box>
          <BookForm />
        </Box>
      </Center>
    </>
  );
}
