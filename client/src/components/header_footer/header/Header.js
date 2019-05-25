import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../../store/actions/userAction';
import { connect } from 'react-redux';
class Header extends Component {
  state = {
    page: [
      {
        name: 'Home',
        linkTo: '/',
        public: true
      },
      {
        name: 'Guitars',
        linkTo: '/shop',
        public: true
      }
    ],
    user: [
      {
        name: 'My Cart',
        linkTo: '/user/cart',
        public: false
      },
      {
        name: 'My Account',
        linkTo: '/user/dashboard',
        public: false
      },
      {
        name: 'Log in',
        linkTo: '/register_login',
        public: true
      },
      {
        name: 'Log out',
        linkTo: '/user/logout',
        public: false
      }
    ],
    currentUser: {}
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      currentUser:
        nextProps.user !== prevState.currentUser ? nextProps.user : null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user !== prevProps.user) {
      this.setState({ currentUser: this.props.user });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.user !== nextProps.user;
  }

  componentDidMount() {
    this.props.auth();
    this.setState({ currentUser: this.props.user });
  }
  defaultLink = (item, i) => (
    <Link to={item.linkTo} key={i}>
      {item.name}
    </Link>
  );
  showLinks = type => {
    let list = [];
    if (this.props.user) {
      type.forEach(item => {
        if (!this.props.user.isAuthenticated) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          if (item.name !== 'Log in') {
            list.push(item);
          }
        }
      });
    }
    return list.map((item, i) => {
      if (item.name !== 'My Cart') {
        return this.defaultLink(item, i);
      }
    });
  };
  render() {
    return (
      <header className='bck_b_light'>
        <div className='container'>
          <div className='left'>
            <div className='logo'>WAVES</div>
          </div>
          <div className='right'>
            <div className='top'>{this.showLinks(this.state.page)}</div>
            <div className='bottom'>{this.showLinks(this.state.user)}</div>
          </div>
        </div>
      </header>
    );
  }
}
const mapStateToprops = state => {
  return { user: state.user };
};

export default connect(
  mapStateToprops,
  { auth }
)(Header);
