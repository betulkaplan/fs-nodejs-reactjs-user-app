import React from "react";
import AppRouter from "./router/AppRouter";
import { CookiesProvider } from 'react-cookie';

const App = () => {
  return (
    <div>
      <CookiesProvider>
        <AppRouter />
      </CookiesProvider>
    </div>
  );
};

export default App;
