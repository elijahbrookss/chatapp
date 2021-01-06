import LoginSignup from './containers/LoginSignup';
import Channel from './containers/Channel';
import LandingPage from './containers/Landing';
import User from './containers/User';
import NavBar from './containers/NavBar';
import PrivateComponent from './containers/PrivateComponent';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginSignup} />
          <PrivateComponent exact path="/channels/:id" component={Channel} />
          <PrivateComponent exact path="/profile" component={User} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
