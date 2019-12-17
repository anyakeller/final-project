import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Books from './pages/Books';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoMatch from './pages/NoMatch';
import NewContact from './pages/NewContact';
import Nav from './components/Nav';
import {/* getCookie, */ authenticateUser} from './utils/handleSessions';

class App extends React.Component {
  // check cookie
  // getCookie();

  state = {
    authenticated: false,
    loading: false
  };

  authenticate = () =>
    authenticateUser()
      .then(auth => this.setState({authenticated: auth.data, loading: false}))
      .catch(err => console.log(err));

  componentWillMount() {
    this.authenticate();
  }

  PrivateRoute = ({Component: Component, ...rest}) => (
    <Route
      {...rest}
      render={props => {
        if (this.state.authenticated){ 
					console.log(Component)
					return <Component {...props} />}
        else if (this.state.loading === true) return <div></div>;
        else return <Redirect to="/login" />;
      }}
    />
  );

  homeRoute = ({...rest}) => (
    <Route
      exact
      path="/"
      render={props =>
        this.state.authenticated === true ? (
          <Redirect to="/contacts" />
        ) : this.state.loading === true ? (
          <div></div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <this.homeRoute exact path="/" />
            <Route
              exact
              path="/login"
              render={props => (
                <Login
                  {...props}
                  authenticate={this.authenticate}
                  authenticated={this.state.authenticated}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <Signup
                  {...props}
                  authenticate={this.authenticate}
                  authenticated={this.state.authenticated}
                />
              )}
            />
            // <this.PrivateRoute exact path="/books" component={Books} />
            <this.PrivateRoute exact path="/contacts" component={Contacts} />
            <this.PrivateRoute
              exact
              path="/newContact"
              component={NewContact}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
