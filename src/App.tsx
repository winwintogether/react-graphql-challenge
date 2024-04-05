import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./Pages/Login/Login";
import Account from "./Pages/Account/Account";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/account" component={Account} />

          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
};

export default App;
