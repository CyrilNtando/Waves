import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../store/actions/userAction';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function(ComposedClass, reload, adminRoute = null) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true,
      user: {}
    };
    static getDerivedStateFromProps(nextProps, prevState) {
      return {
        user: nextProps.user !== prevState.user ? nextProps.user : null
      };
    }

    componentDidMount() {
      this.props.auth();
      this.setState({
        loading: false,
        user: this.props.user
      });
      this.AutherizeRoutes();
    }

    componentDidUpdate() {
      if (this.props.user !== this.state.user) {
        this.setState({
          loading: false,
          user: this.props.user
        });
        this.AutherizeRoutes();
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return this.props.user !== nextProps.user;
    }
    AutherizeRoutes() {
      let { user } = this.state;
      if (!user.isAuthenticated) {
        if (reload) {
          this.props.history.push('/register_login');
        }
      } else {
        if (adminRoute && !user.isAdmin) {
          this.props.history.push('/user/dashboard');
        } else {
          if (reload === false) {
            this.props.history.push('/user/dashboard');
          }
        }
      }
      this.setState({ loading: false });
    }
    render() {
      if (this.state.loading) {
        return (
          <div className='main_loader'>
            <CircularProgress style={{ color: '#2196F3' }} thickness={7} />
          </div>
        );
      }
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    };
  }

  return connect(
    mapStateToProps,
    { auth }
  )(AuthenticationCheck);
}
