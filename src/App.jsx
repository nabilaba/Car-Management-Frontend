import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Mendaftar from "./pages/Mendaftar";
import Dashboard from "./pages/Dashboard";
import TambahData from "./pages/TambahData";
import UpdateData from "./pages/UpdateData";
import TambahAdmin from "./pages/TambahAdmin";
import Layout from "./templates/Layout";

function App() {
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
