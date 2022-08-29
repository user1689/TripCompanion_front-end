import React, { useCallback, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'


import User from './User/pages/User';
import UserPlace from './Places/pages/UserPlace'
import MainNavigation from './shared/UIElements/MainNavigation';
import NewPlace from './Places/pages/NewPlace';
import UpdatePlace from './Places/pages/UpdatePlace';
import Auth from './User/pages/Auth';
import { AuthContext } from './shared/context/auth-context';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);
  const logout = useCallback((uid) => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);
  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/' component={User} exact />
        <Route path='/:userId/places' component={UserPlace} exact />
        <Route path='/places/new' component={NewPlace} exact />
        <Route path='/places/:placeId' component={UpdatePlace} exact />
        <Redirect to='/'></Redirect>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' component={User} exact />
        <Route path='/:userId/places' component={UserPlace} exact />
        <Route path='/auth' component={Auth} exact></Route>
        <Redirect to='/auth'></Redirect>
      </Switch>
    );
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      <BrowserRouter>
        <MainNavigation></MainNavigation>
        <main>

          {/* <Route path='/places' exact/> */}
          {routes}

        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
