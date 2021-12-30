import React from "react";
import Navbar from "./components/Navbar";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRouter />
    </div>
  );
};

export default App;
