import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GlobalStyle } from "./styles";

const App = () => (
  <BrowserRouter>
    <>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route path='/auth' exact component={Auth} />
        <Route path='/' exact component={Home} />
      </Switch>
    </>
  </BrowserRouter>
);

export default App;
