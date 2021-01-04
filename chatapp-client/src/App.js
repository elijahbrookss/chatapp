import LoginSignup from './containers/LoginSignup';
import Channel from './containers/Channel';
import LandingPage from './containers/Landing';
import User from './containers/User';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginSignup}/>
          <Route exact path="/channels/:id" component={Channel} />
          <Route exact path="/users/:id" component={User} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
