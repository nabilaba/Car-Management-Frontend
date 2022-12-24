import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Mendaftar() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name == "" || email == "" || password == "")
      return swal("Error", "Lengkapi semua kolom terlebih dahulu!", "error");

    axios
      .post(`${import.meta.env.VITE_BE_URL}/users/register`, {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        swal("Sukses", res.data.message, "success");
        navigate("/");
      })
      .catch((err) => {
        swal("Error", err.response.data.message, "error");
      });
  };

  return (
    <Container maxW="2xl" p="4">
      <Flex align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} py={4} w="full">
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Mendaftar</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Untuk melakukan <Link color={"blue.400"}>penyewaan</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack
              as={"form"}
              spacing={3}
              onSubmit={(e) => handleSubmit(e)}
              autoComplete="off"
            >
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack pt={6}>
                <Button colorScheme="blue" type="submit">
                  Mendaftar
                </Button>
              </Stack>
              <Stack pt={2}>
                <Text align={"center"}>
                  Sudah punya akun?{" "}
                  <Link as={RouterLink} to="/" color={"blue.400"}>
                    Silahkan masuk
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
}
