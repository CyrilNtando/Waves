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
import ManageCategories from './components/User/Admin/ManageCategories';
import AddProduct from './components/User/Admin/AddProduct';
import ProductPage from './components/Product/ProductPage';
import withAuth from './hoc/withAuth';
import UserCart from './components/User/UserCart';
import UserProfile from './components/User/UserProfile';
import ManageSite from './components/User/Admin/ManageSite';
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
        <Route path='/user/cart' exact component={withAuth(UserCart, true)} />
        <Route
          path='/user/user_profile'
          exact
          component={withAuth(UserProfile, true)}
        />
        <Route
          path='/admin/add_product'
          exact
          component={withAuth(AddProduct, true)}
        />
        <Route
          path='/product_detail/:id'
          exact
          component={withAuth(ProductPage, null)}
        />
        <Route
          path='/admin/manage_categories'
          exact
          component={withAuth(ManageCategories, true)}
        />
        <Route
          path='/admin/site_info'
          exact
          component={withAuth(ManageSite, true)}
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
