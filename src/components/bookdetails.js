import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Mengambil data buku menggunakan fetch jika 'id' tersedia
      fetch(`/api/books/${id}`, {
        method: "GET",
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 404) {
            throw new Error("Book not found");
          } else {
            throw new Error("Something went wrong");
          }
        })
        .then((data) => {
          console.log("Data buku:", data);
          setBook(data.book);
          setLoading(false);
          console.log(data); // Cetak data buku ke konsol
        })
        .catch((error) => {
          console.error("Terjadi kesalahan dalam permintaan:", error);
        });
    }
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        // Handle jika penghapusan berhasil
        router.push("/");
      } else {
        // Handle jika ada kesalahan
        console.error("Gagal menghapus buku");
      }
    } catch (error) {
      console.error("Terjadi kesalahan dalam permintaan DELETE:", error);
    }
  };

  return (
    <Center
      background="linear-gradient(to top, #051937, #2d4b62, #64818b, #a7b9b9, #eff2f1)"
      h="xl"
    >
      <Box>
        {isLoading ? (
          <Skeleton height="300px" my="4" />
        ) : (
          <Flex my="4">
            <Box w="300px">
              <Image src={`http://localhost:3000/${book.image}`} alt={book} />
            </Box>
            <Box ml="8">
              <Heading as="h1" size="lg">
                {book.title}
              </Heading>
              <Text fontSize="xl" fontWeight="semibold" color="white">
                {book.author}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" color="white">
                {book.publisher}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" color="white" mb="4">
                {`${book.year} || ${book.pages}`} Pages
              </Text>
            </Box>
          </Flex>
        )}
        {/* {localStorage.getItem("token") && ( */}
        <HStack>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red">Delete</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                Are you sure you want to delete this book?
              </PopoverBody>
              <Button onClick={handleDeleteBook} colorScheme="red">
                Delete
              </Button>
            </PopoverContent>
          </Popover>
          <Link as={NextLink} href={`/editbook/${id}`}>
            <Button>Edit</Button>
          </Link>
        </HStack>
        {/* )} */}
      </Box>
    </Center>
  );
}
