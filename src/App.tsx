import theme from "./theme/theme";
import { BrowserRouter } from "react-router-dom"

import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "./router/Router";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
