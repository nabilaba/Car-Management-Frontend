import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Container,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Mendaftar() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name == "" || email == "" || password == "" || role == "")
      return swal("Error", "Lengkapi semua kolom terlebih dahulu!", "error");

    axios
      .post(`${import.meta.env.VITE_BE_URL}/users/registeradmin`, {
        name: name,
        email: email,
        password: password,
        role: role,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        swal("Sukses", res.data.message, "success");
        navigate("/dashboard");
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
            <Heading fontSize={"4xl"}>Menambah Admin</Heading>
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
              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select
                  placeholder="Pilih role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">SuperAdmin</option>
                </Select>
              </FormControl>
              <Stack pt={6}>
                <Button colorScheme="blue" type="submit">
                  Tambahkan
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
}
