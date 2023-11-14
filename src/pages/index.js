import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import Books from "@/components/books";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Lakukan permintaan ke rute API di sini
    fetch("/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data.books))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Navbar />
      <SimpleGrid
        spacing={2}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        background="linear-gradient(to top, #051937, #2d4b62, #64818b, #a7b9b9, #eff2f1)"
        padding="30px"
      >
        {books?.map((book) => (
          <Books key={`${book.id} ${book.title}`} {...book} />
        ))}
      </SimpleGrid>
    </>
  );
}
