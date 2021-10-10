
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import { Header } from './components/Header';
import { OrderListComponent } from "./components/OrderListComponent";
import {OrderDetailComponent} from './components/OrderDetailComponent';
import {ApartmentListComponent} from './components/ApartmentListComponent';
import {ApartmentDetailComponent} from './components/ApartmentDetailComponent';
import styled from 'styled-components';

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
      <Route path='/apartments/detail/:id' exact={true}>
        <ApartmentDetailComponent />
      </Route>
      </Switch>
    </MainWrapper>
    </Router>
  );
}

