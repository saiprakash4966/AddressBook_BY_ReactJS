import logo from './logo.svg';
import './App.css';
import AddressBookForm from './components/addressbook-form';
import Dashboard from './components/dashboard';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route exact path="/form" component={AddressBookForm}></Route>
          <Route exact path="/form/:id" component={AddressBookForm}></Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
