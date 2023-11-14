import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();

  const loginUser = async (e) => {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const { token } = await response.json();
      window.localStorage.setItem("token", token);

      setIsLogin(true);
      window.location.reload();
    } else {
      const error = await response.json();
      console.error(error.error); // Gagal login
      // Lakukan tindakan sesuai dengan gagal login di sini.
    }
  };

  useEffect(() => {
    const checkStatusLogin = () => {
      const storedToken = window.localStorage.getItem("token");
      if (storedToken) {
        setIsLogin(true);
      }
    };
    checkStatusLogin();
  }, []);

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="#ECF0EF"
      color="black"
    >
      <Link href="/">
        <Flex align="center" m r={5} cursor="pointer">
          <Text
            fontSize="xl"
            fontWeight="bold"
            textShadow="2px 2px 4px rgba(0, 0, 0, 1.2)"
          >
            G-Library
          </Text>
        </Flex>
      </Link>
      <HStack>
        {isLogin && (
          <Link href="/newbook">
            <Button colorScheme="facebook">Create New Book</Button>
          </Link>
        )}
        {!isLogin ? (
          <Button onClick={onOpen} colorScheme="facebook">
            Login
          </Button>
        ) : (
          <Button
            colorScheme="facebook"
            onClick={() => {
              window.localStorage.removeItem("token");
              setIsLogin(false);
            }}
          >
            Logout
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const token = await loginUser(
                e.target.email.value,
                e.target.password.value
              );
              window.localStorage.setItem("token", token);

              onClose();
            } catch (err) {
              toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" form="login-form" colorScheme="blue" mr={3}>
                Login
              </Button>
              <Link href="/registerForm" onClick={onClose}>
                <Button variant="ghost">
                  Doesn't Have Account? Click here
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
}
