import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "../pages/details/Details";
import Home from "../pages/home/Home";
import Add from "../pages/user/Add";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/detail/:id" element={<Details />}></Route>
        <Route path="/add" element={<Add />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
