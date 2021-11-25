import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthContext from './context/auth-context';
import Layout from './components/layout/Layout';

import Home from './pages/Home';
import Authentication from './pages/Authentication';
import Error from './pages/Error';
import Books from './pages/Books';


function App() {
  const authContext = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        { authContext.isLoggedIn &&
          <Route path="/books">
            <Books/>
          </Route>
        }
        <Route path="/error">
          <Error/>
        </Route>
        { !authContext.isLoggedIn &&
          <Route path='/auth'>
            <Authentication />
          </Route>
        }
        <Route path="/login">
          <Authentication login={true}/>
        </Route>
        <Route path="/register">
          <Authentication login={false}/>
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>

    </Layout>
  );
}

export default App;
