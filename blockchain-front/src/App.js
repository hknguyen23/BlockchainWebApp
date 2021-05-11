import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ErrorScreen from './components/ErrorScreen/ErrorScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('userID') !== null);

  const routes = [
    {
      path: "/",
      exact: true,
      main: () => <Home />
    }, {
      path: "/signin",
      main: () => <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    }, {
      path: "/signup",
      main: () => <SignUp />
    }, {
      path: "/error",
      main: () => <ErrorScreen />
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
