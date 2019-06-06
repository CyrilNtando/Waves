import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, logOutUser } from '../../../store/actions/userAction';
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

  logOutHandler = () => {
    this.props.logOutUser();
    //TODO: check if the server cleared
    this.props.history.push('/');
  };
  defaultLink = (item, i) =>
    item.name === 'Log out' ? (
      <div
        className='log_out_link'
        key={i}
        onClick={() => this.logOutHandler()}
      >
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );

  cartLink = (item, i) => {
    const user = this.props.user;
    return (
      <div className='cart_link' key={i}>
        <span>{user.cart ? user.cart.length : 0}</span>
        <Link to={item.linkTo}>{item.name}</Link>
      </div>
    );
  };
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
      } else {
        return this.cartLink(item, i);
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
            <div className='top'>{this.showLinks(this.state.user)}</div>
            <div className='bottom'>{this.showLinks(this.state.page)}</div>
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
  { auth, logOutUser }
)(withRouter(Header));
