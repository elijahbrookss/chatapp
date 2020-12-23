import LoginSignup from './containers/LoginSignup';
import Channel from './containers/Channel.js';

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
          <Route exact path="/login" component={LoginSignup}/>
          <Route exact path="/channels/:id" component={Channel} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
