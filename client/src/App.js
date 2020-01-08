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
import AnimationView from './pages/AnimationView';
import {
  /* getCookie, */ authenticateUser,
  logoutUser
} from './utils/handleSessions';

class App extends React.Component {
  // check cookie
  // getCookie();
  constructor(props) {
    super(props);
    this.state = {
      // authenticated: false,
      // loading: false,
      navoptns: [{name: '', route: ''}]
    };
  }
  authenticate(who) {
    authenticateUser()
      .then(auth => {
        console.log('hi');
        who.setState({
          authenticated: auth.data,
          loading: false
        });
        this.setState({
          navoptns: [
            {name: 'contacts', route: 'contacts'},
            {name: '+ new contact', route: 'newContact'},
            {name: 'logout', route: 'logout'}
          ]
        });
        // return auth.data;
      })
      .catch(err => {
        console.log(err);
        console.log('oh no');
        who.setState({
          authenticated: false,
          loading: false
        });
        this.setState({
          navoptns: [
            {name: 'login', route: ''},
            {name: 'create account', route: 'signup'}
          ]
        });
        // return false;
      });
  }

  logout() {
    logoutUser();
    this.setState({
      // authenticated: false,
      // loading: false,
      navoptns: [
        {name: 'login', route: ''},
        {name: 'create account', route: 'signup'}
      ]
    });
  }

  componentWillMount() {
    // this.authenticate(this);
  }

  render() {
    return (
      <Router>
        <div>
          <Nav navLinks={this.state.navoptns} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Contacts
                  {...props}
                  authenticate={(who)=>this.authenticate(who)}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Login
                  {...props}
                  authenticate={(who)=>this.authenticate(who)}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <Signup
                  {...props}
                  authenticate={(who)=>this.authenticate(who)}
                />
              )}
            />
            <Route
              exact
              path="/contacts"
              render={props => (
                <Contacts
                  {...props}
                  authenticate={(who)=>this.authenticate(who)}
                />
              )}
            />
            <Route
              exact
              path="/animationView"
              render={props => (
                <AnimationView
                  {...props}
                  authenticate={(who)=>this.authenticate(who)}
                />
              )}
            />
            <Route
              exact
              path="/newContact"
              render={props => (
                <NewContact
                  {...props}
                  authenticate={(who)=>this.authenticate(who)}
                />
              )}
            />
            <Route
              exact
              path="/logout"
              render={props => {
                this.logout();
                return <Redirect to="/login" />;
              }}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
