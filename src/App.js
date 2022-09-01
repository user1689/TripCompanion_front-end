import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import MainNavigation from './shared/UIElements/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/UIElements/LoadingSpinner';

const User = React.lazy(() => import('./User/pages/User'));
const NewPlace = React.lazy(() => import('./Places/pages/NewPlace'));
const UserPlace = React.lazy(() => import('./Places/pages/UserPlace'));
const UpdatePlace = React.lazy(() => import('./Places/pages/UpdatePlace'));
const Auth = React.lazy(() => import('./User/pages/Auth'));

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
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
    <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userId, login, logout }}>
      <BrowserRouter>
        <MainNavigation></MainNavigation>
        <main>

          {/* <Route path='/places' exact/> */}
          <Suspense fallback={<div className="center"><LoadingSpinner/></div>}>{routes}</Suspense>

        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
