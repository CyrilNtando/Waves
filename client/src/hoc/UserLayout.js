import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const links = [
  { name: 'My account', linkTo: '/user/dashboard' },
  { name: 'User Infomation', linkTo: '/user/user_profile' },
  {
    name: 'My Cart',
    linkTo: '/user/cart'
  }
];

const admin = [
  { name: 'Site info', linkTo: '/admin/site_info' },
  { name: 'Add Product', linkTo: '/admin/add_product' },
  { name: 'Manage Categories', linkTo: '/admin/manage_categories' }
];
function UserLayout(props) {
  const generateLinks = links =>
    links.map((item, i) => {
      return (
        <Link key={i} to={item.linkTo}>
          {item.name}
        </Link>
      );
    });

  return (
    <div className='container'>
      <div className='user_container'>
        <div className='user_left_nav'>
          <h2>My Account</h2>
          <div className='links'>{generateLinks(links)}</div>

          {props.user.isAdmin === true ? (
            <div>
              <h2>Admin</h2>
              <div className='links'>{generateLinks(admin)}</div>
            </div>
          ) : null}
        </div>

        <div className='user_right'>{props.children}</div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(UserLayout);
