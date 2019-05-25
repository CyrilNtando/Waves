import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './hoc/Layout';
import configureStore from './store';
import { auth } from './store/actions/userAction';
import Home from './components/home/Home';
import RegisterLogin from './components/register-login/Auth';
import Register from './components/register-login/Register';
import UserDashboard from './components/User/UserDashboard';
import withAuth from './hoc/withAuth';

function Routes() {
  return (
    <Provider store={configureStore}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route
              path='/user/dashboard'
              exact
              component={withAuth(UserDashboard, true)}
            />

            <Route
              path='/register'
              exact
              component={withAuth(Register, false)}
            />
            <Route
              path='/register_login'
              exact
              component={withAuth(RegisterLogin, false)}
            />
            <Route path='/' exact component={withAuth(Home, null)} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default Routes;
