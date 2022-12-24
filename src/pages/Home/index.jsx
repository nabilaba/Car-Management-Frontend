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
  Text,
  useColorModeValue,
  Link,
  Container,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

export default function Home() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "profile email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const handleSuccess = (googleData) => {
    axios
      .post(`${import.meta.env.VITE_BE_URL}/users/logingoogle`, {
        tokenId: googleData.tokenId,
      })
      .then((res) => {
        swal("Success", res.data.message, "success");
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        swal("Error", err.response.data.message, "error");
      });
  };

  const handleFailure = (res) => {
    console.log(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email == "" || password == "")
      return swal("Error", "Lengkapi semua kolom terlebih dahulu!", "error");

    axios
      .post(`${import.meta.env.VITE_BE_URL}/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        swal("Success", res.data.message, "success");
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        swal("Error", err.response.data.message, "error");
      });
  };

  return (
    <Container maxW="2xl" p="4">
      <Flex align={"center"} justify={"center"}>
        <Stack spacing={6} mx={"auto"} py={6} w="full">
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Masuk ke Akun</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Untuk melakukan <Link color={"blue.400"}>penyewaan</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            pt={6}
            pb={4}
            px={8}
          >
            <Stack
              as={"form"}
              spacing={3}
              onSubmit={(e) => handleSubmit(e)}
              autoComplete="off"
            >
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
              <Stack pt={2}>
                <Button colorScheme="blue" type="submit">
                  Masuk
                </Button>
              </Stack>
            </Stack>
            <HStack my="4" textColor={"gray.500"}>
              <Divider />
              <Text>Atau</Text>
              <Divider />
            </HStack>
            <Stack align={"center"}>
              <GoogleLogin
                clientId={clientId}
                buttonText="Masuk dengan akun Google"
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                cookiePolicy="single_host_origin"
                theme={useColorModeValue("light", "dark")}
              />
            </Stack>
            <Stack mt={6}>
              <Text align={"center"}>
                Belum punya akun?{" "}
                <Link as={RouterLink} to="/mendaftar" color={"blue.400"}>
                  Silahkan mendaftar
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
}
