import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout';
import { auth } from './store/actions/userAction';
import Home from './components/home/Home';
import RegisterLogin from './components/register-login/Auth';
import Register from './components/register-login/Register';
import Shop from './components/shop/Shop';
import UserDashboard from './components/User/UserDashboard';
import withAuth from './hoc/withAuth';

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <Route path='/shop' exact component={withAuth(Shop, null)} />
        <Route path='/' exact component={withAuth(Home, null)} />
        <Route
          path='/user/dashboard'
          exact
          component={withAuth(UserDashboard, true)}
        />
        <Route path='/register' exact component={withAuth(Register, false)} />
        <Route
          path='/register_login'
          exact
          component={withAuth(RegisterLogin, false)}
        />
      </Switch>
    </Layout>
  );
};
export default Routes;
