import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Mendaftar from "./pages/Mendaftar";
import Dashboard from "./pages/Dashboard";
import TambahData from "./pages/TambahData";
import UpdateData from "./pages/UpdateData";
import TambahAdmin from "./pages/TambahAdmin";
import Layout from "./templates/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [role, setRole] = useState("user");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setRole(res.data.role);
        });
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tambahdata" element={<TambahData />} />
        <Route path="/cars/:id" element={<UpdateData />} />
        <Route path="/tambahadmin" element={<TambahAdmin />} />
        <Route path="/mendaftar" element={<Mendaftar />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
