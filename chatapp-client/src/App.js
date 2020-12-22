import LoginSignup from './containers/LoginSignup'
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
          <Route exact path="/login" component={()=>{
            return <LoginSignup />
          }}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
