//import logo from './logo.svg';
import "./App.css";

import { Home } from "./Home";
import { Torol } from "./Torol";
import { Product } from "./Product";
import { Navigation } from "./Navigation";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          TELMEN
        </h3>

        <Navigation />

        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/torol" component={Torol} />
          <Route path="/product" component={Product} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
