import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { AtSignIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Navbar() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const logout = () => {
    swal("Yakin ingin logout?", {
      buttons: {
        cancel: "Tidak",
        catch: {
          text: "Ya",
          value: "catch",
        },
      },
      icon: "warning",
    }).then((value) => {
      switch (value) {
        case "catch":
          localStorage.removeItem("token");
          swal("Logout berhasil!", {
            icon: "success",
          });
          navigate("/");
          break;
        default:
          swal("Logout dibatalkan!", {
            icon: "error",
          });
      }
    });
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box as={RouterLink} to={"/"}>
          PT. Sewa Mobil
        </Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"}>
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant={"ghost"}
            />

            {localStorage.getItem("token") && (
              <>
                <IconButton as={RouterLink} to={"/dashboard"} icon={<AtSignIcon />} variant={"ghost"} />
                <IconButton icon={<CloseIcon />} variant={"ghost"} onClick={logout} />
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
