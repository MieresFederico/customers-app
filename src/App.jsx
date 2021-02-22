import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HomeContainer from "./containers/HomeContainer";
import CustomersContainer from "./containers/CustomersContainer";
import CustomerContainer from "./containers/CustomerContainer";
import NewCustomerContainer from "./containers/NewCustomerContainer";

class App extends PureComponent {
  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={(props) => <HomeContainer {...props} />}
          />
          <Route
            exact
            path="/customers"
            render={(props) => <CustomersContainer {...props} />}
          />
          <Switch>
            <Route
              path="/customers/new"
              render={(props) => <NewCustomerContainer {...props} />}
            />
            <Route
              path="/customers/:dni"
              render={(props) => (
                <CustomerContainer dni={props.match.params.dni} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
