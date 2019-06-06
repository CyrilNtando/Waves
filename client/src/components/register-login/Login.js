import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logInUser } from '../../store/actions/userAction';
import FormField from '../utils/Form/FormField';
import {
  update,
  generateData,
  isFormValid
} from '../../components/utils/Form/FormActions';
class Login extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    },
    currentUser: {},
    logInError: null
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user !== prevState.currentUser || nextProps.error !== null) {
      const { user, error } = nextProps;
      return { currentUser: user, logInError: error };
    }
    return null;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.props.user !== prevState.currentUser) {
      const { user } = this.props;
      return user;
    } else return null;
  }
  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      this.props.history.push('/user/dashboard');
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      let currentUser = snapshot;
      if (currentUser.isAuthenticated) {
        this.props.history.push('/user/dashboard');
      } else if (currentUser.success) {
        this.props.history.push('/user/dashboard');
      }
    } else if (this.props.error !== prevProps.error) {
      this.setState({ formError: true });
    }
  }
  submitForm(event) {
    event.preventDefault();
    let dataSubmit = generateData(this.state.formdata, 'login');
    let formIsValid = isFormValid(this.state.formdata, 'login');
    if (formIsValid) {
      this.props.logInUser(dataSubmit);
    }
  }
  updateForm(element) {
    const newFormdata = update(element, this.state.formdata, 'login');
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  }
  render() {
    return (
      <div className='signin_wrapper'>
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'password'}
            formdata={this.state.formdata.password}
            change={element => this.updateForm(element)}
          />
          {this.state.formError ? (
            <div className='error_label'>{this.props.error.message}</div>
          ) : null}
          <button onClick={event => this.submitForm(event)}>LogIn</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.error
  };
};
export default connect(
  mapStateToProps,
  { logInUser }
)(withRouter(Login));
