import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  SimpleGrid,
  Container,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [me, setMe] = useState({});

  const getData = () => {
    axios
      .get("http://localhost:8000/cars", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        swal("Error!", err.response.data.message, "error").then(() => {
          navigate("/");
        });
      });
  };

  useEffect(() => {
    getData();

    axios
      .get("http://localhost:8000/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMe(res.data);
      })
      .catch((err) => {
        swal("Error!", err.response.data.message, "error").then(() => {
          navigate("/");
        });
      });
  }, []);

  const TglIndo = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    return `${day} ${month} ${year}, ${hour}:${minute}`;
  };

  const formatRP = (price) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    const priceInt = parseInt(price);
    return formatter.format(priceInt);
  };

  const deleteCar = (id) => {
    swal({
      title: "Apakah kamu yakin?",
      text: "Data yang kamu pilih tidak dapat dipulihkan setelah terhapus!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:8000/cars/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              swal("Berhasil!", res.data.message, "success");
              getData();
            } else {
              swal("Error!", res.data.message, "error");
            }
          })
          .catch((err) => {
            console.log(err);
            swal("Error!", err.response.data.message, "error");
          });
      } else {
        swal("Yasudah!", "Data kamu masih aman!", "success");
      }
    });
  };

  const deleteCarPermanent = (id) => {
    swal({
      title: "Apakah kamu yakin?",
      text: "Data yang kamu pilih tidak dapat dipulihkan setelah terhapus!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:8000/cars/permanent/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              swal("Berhasil!", res.data.message, "success");
              getData();
            } else {
              swal("Error!", res.data.message, "error");
            }
          })
          .catch((err) => {
            console.log(err);
            swal("Error!", err.response.data.message, "error");
          });
      } else {
        swal("Yasudah!", "Data kamu masih aman!", "success");
      }
    });
  };

  const restoreCar = (id) => {
    swal({
      title: "Apakah kamu yakin?",
      text: "Data yang kamu pilih akan dipulihkan!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(
            `http://localhost:8000/cars/${id}`,
            {
              deletedBy: null,
              deletedAt: null,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              swal("Berhasil!", res.data.message, "success");
              getData();
            } else {
              swal("Error!", res.data.message, "error");
            }
          })
          .catch((err) => {
            console.log(err);
            swal("Error!", err.response.data.message, "error");
          });
      } else {
        swal("Yasudah!", "Data kamu tidak dipulihkan!", "success");
      }
    });
  };

  return (
    <Container maxW="full" p="4">
      <Heading size="lg">Selamat datang, {me.name}</Heading>
      <Text mb="4" fontStyle={"italic"}>
        Kamu login sebagai {me.role}
      </Text>
      {me.role !== "member" && (
        <Button as={RouterLink} to="/tambahdata" colorScheme="green" mb="4">
          Tambah Data
        </Button>
      )}
      {me.role === "superadmin" && (
        <Button
          as={RouterLink}
          to="/tambahadmin"
          colorScheme="green"
          mb="4"
          ms="2"
        >
          Tambah Admin
        </Button>
      )}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
        {cars
          .filter((car) =>
            me.role === "superadmin" ? car : car.deletedAt === null
          )
          .map((car, i) => (
            <Card borderWidth="1px" key={i}>
              <CardBody>
                <Image
                  src={car.image_url}
                  alt={car.name}
                  borderRadius="lg"
                  h={{ base: "250", md: "200", lg: "250" }}
                  w="full"
                />
                <Stack mt="6">
                  <Heading size="md">{car.name}</Heading>
                  <Text>
                    Mobil {car.name} dengan ukuran {car.size}
                  </Text>
                  <Text color="blue.600" fontSize="2xl">
                    {formatRP(car.rent_price)}
                  </Text>
                </Stack>
                {me.role !== "member" && (
                  <Box mt="6">
                    <Text>
                      Diupdate oleh {car.updated.name} pada{" "}
                      {TglIndo(car.updatedAt)}
                    </Text>
                    <Text>
                      Dibuat oleh {car.created.name} pada{" "}
                      {TglIndo(car.createdAt)}
                    </Text>
                    <Text>
                      {car.deletedAt
                        ? `Dihapus oleh ${car.deleted.name} pada ${TglIndo(
                            car.deletedAt
                          )}`
                        : "Belum pernah dihapus"}
                    </Text>
                  </Box>
                )}
              </CardBody>
              {me.role !== "member" && car.deletedAt === null && (
                <>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button
                        as={RouterLink}
                        to={`/cars/${car.id}`}
                        variant="solid"
                        colorScheme={"yellow"}
                      >
                        Update
                      </Button>
                      <Button
                        variant="solid"
                        colorScheme="red"
                        onClick={() => deleteCar(car.id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </>
              )}
              {car.deletedAt !== null && (
                <>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button
                        variant="solid"
                        colorScheme={"yellow"}
                        onClick={() => restoreCar(car.id)}
                      >
                        Restore
                      </Button>
                      <Button
                        variant="solid"
                        colorScheme="red"
                        onClick={() => deleteCarPermanent(car.id)}
                      >
                        Delete Permanent
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </>
              )}
            </Card>
          ))}
      </SimpleGrid>
    </Container>
  );
};

export default Dashboard;
