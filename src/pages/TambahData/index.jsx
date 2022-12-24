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
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function TambahData() {
  const [name, setName] = useState("");
  const [rent_price, setRentPrice] = useState(0);
  const [size, setSize] = useState("");
  const [image_url, setImageUrl] = useState("");

  const navigate = useNavigate();

  const uploadImage = (e, input) => {
    const file = e.files[0];
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post(`${import.meta.env.VITE_BE_URL}/cars/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        input.value = `${import.meta.env.VITE_BE_URL}/${res.data.path}`;
        setImageUrl(`${import.meta.env.VITE_BE_URL}/${res.data.path}`);
      })
      .catch((err) => {
        swal("Error!", err.response.data.message, "error");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      rent_price: parseFloat(rent_price),
      size,
      image_url,
    };

    axios
      .post(`${import.meta.env.VITE_BE_URL}/cars`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        swal("Sukses!", res.data.message, "success");
        navigate("/dashboard");
      })
      .catch((err) => {
        swal("Error!", err.response.data.message, "error");
      });
  };

  return (
    <Container maxW="2xl" p="4">
      <Flex align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} py={12} w="full">
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Tambahkan Data
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Isi kolom secara lengkap untuk menambahkan data
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            w="full"
          >
            <Stack
              as={"form"}
              id="form"
              spacing={4}
              autoComplete="off"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                <Box w="full">
                  <FormControl isRequired>
                    <FormLabel>Nama</FormLabel>
                    <Input
                      type="text"
                      placeholder="Toyota"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box w="full">
                  <FormControl isRequired>
                    <FormLabel>Sewa / Hari</FormLabel>
                    <Input
                      type="number"
                      placeholder="100000"
                      onChange={(e) => setRentPrice(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box w="full">
                  <FormControl isRequired>
                    <FormLabel>Ukuran Mobil</FormLabel>
                    <Select
                      placeholder="Pilih ukuran"
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option value="Kecil">Kecil</option>
                      <option value="Sedang">Sedang</option>
                      <option value="Luas">Luas</option>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
              <FormControl isRequired>
                <FormLabel>Gambar Mobil</FormLabel>
                <InputGroup>
                  <Input
                    id="image_url"
                    type="address"
                    placeholder="https://..."
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <InputRightElement h={"full"} w={"5rem"}>
                    <Button
                      variant={"solid"}
                      colorScheme={"blue"}
                      onClick={() =>
                        document.getElementById("uploadImageWithButton").click()
                      }
                    >
                      UPLOAD
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <input
                type="file"
                id="uploadImageWithButton"
                hidden
                onChange={(e) => uploadImage(e.target, document.getElementById("image_url"))}
              />
              <Stack spacing={10} pt={2}>
                <Button size="lg" colorScheme="green" type="submit">
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
