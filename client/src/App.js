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
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: false
    };
  }
  authenticate(who) {
    authenticateUser()
      .then(auth => {
        console.log('hi');
        who.setState({authenticated: auth.data, loading: false});
        // return auth.data;
      })
      .catch(err => {
        console.log(err);
        console.log('oh no');
        who.setState({authenticated: false, loading: false});
        // return false;
      });
  }

  componentWillMount() {
    this.authenticate(this);
  }


  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Contacts
                  {...props}
                  authenticate={this.authenticate}
                  authenticated={this.state.authenticated}
                />
              )}
            />
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
            <Route
              exact
              path="/contacts"
              render={props => (
                <Contacts
                  {...props}
                  authenticate={this.authenticate}
                  authenticated={this.state.authenticated}
                />
              )}
            />
            <Route
              exact
              path="/newContact"
              render={props => (
                <NewContact
                  {...props}
                  authenticate={this.authenticate}
                  authenticated={this.state.authenticated}
                />
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
