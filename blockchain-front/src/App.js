import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import AddTransaction from './components/Transaction/AddTransaction';
import ViewTransactions from './components/Transaction/ViewTransactions';
import GetMoney from './components/Money/GetMoney';
import ErrorScreen from './components/ErrorScreen/ErrorScreen';
import { getUser } from './services/UserService';

export default function App() {
  const history = useHistory();
  const userID = localStorage.getItem('userID');
  const [isLoggedIn, setIsLoggedIn] = useState(userID !== null);
  const [user, setUser] = useState({});
  const [wallet, setWallet] = useState({});

  useEffect(() => {
    getUser(userID)
      .then(result => {
        console.log(result);
        if (result.success) {
          setUser(result.user);
          setWallet(result.user.wallet);
        }
      })
      .catch(error => {
        history.push('/error', { errorMessage: error });
      });
  }, []);

  const routes = [
    {
      path: "/signin",
      main: () => <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    }, {
      path: "/signup",
      main: () => <SignUp setIsLoggedIn={setIsLoggedIn} />
    }, {
      path: "/profile",
      main: () => <Profile user={user} wallet={wallet} />
    }, {
      path: "/transactions/add",
      main: () => <AddTransaction wallet={wallet} />
    }, {
      path: "/transactions/view",
      main: () => <ViewTransactions user={user} />
    }, {
      path: "/getMoney",
      main: () => <GetMoney wallet={wallet} />
    }, {
      path: "/error",
      main: () => <ErrorScreen />
    }, {
      path: "/",
      exact: true,
      main: () => <Home isLoggedIn={isLoggedIn} user={user} wallet={wallet} />
    }
  ];

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </header>
        <main>
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  children={<route.main />}
                />
              );
            })}
          </Switch>
        </main>
      </div>
    </Router>
  );
}