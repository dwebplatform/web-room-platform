import styled from 'styled-components';
import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Header } from './components/Header';
import { OrderListComponent } from "./components/OrderListComponent";
import {OrderDetailComponent} from './components/OrderDetailComponent';
import {ApartmentListComponent} from './components/ApartmentListComponent';
import {ApartmentDetailComponent} from './components/ApartmentDetailComponent';
import {CharBoardComponent} from './components/CharBoardComponent';

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
export function App() {
  return (
    <Router>
    <MainWrapper >
      <Header/>
      <Switch>
        
      <Route path="/orders" exact={true}>
      <OrderListComponent/>
      </Route>
      <Route path='/orders/:id' exact={true}>
        <OrderDetailComponent/>
      </Route>
      <Route path='/apartments' exact={true}>
        <ApartmentListComponent />
      </Route>
      <Route  path='/chars-panel' exact={true}>
        <CharBoardComponent />
      </Route>
      <Route path='/apartments/detail/:apartmentId' exact={true}>
        <ApartmentDetailComponent />
      </Route>
      </Switch>
    </MainWrapper>
    </Router>
  );
}

