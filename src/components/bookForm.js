import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function BookForm({ book }) {
  const toast = useToast();
  const { register, handleSubmit, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = async (data) => {
    e.preventDefault();
    try {
      if (!selectedImage) {
        toast({
          title: "Error",
          description: "Please select image",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("publisher", data.publisher);
      formData.append("year", data.year);
      formData.append("pages", data.pages);
      formData.append("image", selectedImage);

      // console.log(formData)
      console.log(FormData);

      if (book) {
        formData.append("id", book.id); // Anda juga bisa mengambil ID dari data yang dikirim
        formData.set("id", book.id); // Set ID buku menggunakan formData.set()

        const response = await fetch(`api/books/${id}`, {
          method: "PUT",
          body: formData,
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error("Gagal mengambil data buku");
            }
          })
          .then((data) => {
            setBook(data.book);
          })
          .catch((error) => {
            console.error("Terjadi kesalahan dalam permintaan:", error);
          });

        if (response.ok) {
          const editedBook = await response.json();
          reset();
          toast({
            title: "Success",
            description: "Book edited successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setSelectedImage("");
          console.log("Edited Book:", editedBook);
        } else {
          toast({
            title: "Error",
            description: "Failed to edit book",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        // Jika book tidak ada, berarti kita ingin membuat buku baru
        const response = await fetch("/api/books", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const createdBook = await response.json();
          reset();
          toast({
            title: "Success",
            description: "Book created successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setSelectedImage("");
          console.log("Created Book:", createdBook);
        } else {
          toast({
            title: "Error",
            description: "Failed to create book",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (book?.image) {
      setSelectedImage(`http://localhost:3000/${book?.image}`);
    }
  }, [book]);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          h="xl"
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
          mt="50px"
        >
          {/* Component Submit Image */}
          <GridItem colStart={2}>
            {selectedImage && (
              <Image w={64} src={selectedImage} alt="Selected Image" />
            )}
            {!book?.image && (
              <FormControl color="black" borderColor="black">
                <FormLabel>Image</FormLabel>
                <Input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                  }}
                />
              </FormControl>
            )}
          </GridItem>

          {/* Components Form */}
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                required
                defaultValue={book?.title}
                bgColor="white"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Author</FormLabel>
              <Input
                name="author"
                required
                defaultValue={book?.author}
                bgColor="white"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Publisher</FormLabel>
              <Input
                name="publisher"
                required
                defaultValue={book?.publisher}
                bgColor="white"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Year</FormLabel>
              <Input
                name="year"
                type="number"
                required
                defaultValue={book?.year}
                bgColor="white"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Pages</FormLabel>
              <Input
                name="pages"
                type="number"
                required
                defaultValue={book?.pages}
                bgColor="white"
              />
            </FormControl>
            <Box align="center" margin="20px">
              <Button type="submit">
                {book ? "Edit Book" : "Create Book"}
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
}
