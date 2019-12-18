import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
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
      .then(auth => {
        console.log('hi');
        this.setState({authenticated: auth.data, loading: false});
      })
      .catch(err => {
        console.log(err);
        console.log('oh no');
        this.setState({authenticated: false, loading: false});
      });

  componentWillMount() {
    this.authenticate();
  }

  PrivateRoute = ({Component: Component, ...rest}) => {
    console.log(this.state.authenticated);
    if (this.state.authenticated) {
      return (
        <Route
          {...rest}
          render={props => {
            console.log('is auth');
            return <Component {...props} />;
          }}
        />
      );
    } else if (this.state.loading === true) return <div></div>;
    else {
      console.log('not auth');
      return <Redirect to="/login" />;
    }
  };

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
