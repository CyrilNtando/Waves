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
    user: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user !== prevState.user) {
      const { user } = nextProps;
      return { user: user };
    }
    return null;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.currentUser !== this.props.currentUser) {
      const user = this.props.currentUser;
      console.log(user);
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
      if (currentUser.success === true || currentUser.isAuthenticated) {
        prevProps.history.push('/user/dashboard');
      } else if (prevProps.error.isAuth === false) {
        this.setState({ formError: true });
      }
    }
  }
  submitForm(event) {
    event.preventDefault();
    let dataSubmit = generateData(this.state.formdata, 'login');
    let formIsValid = isFormValid(this.state.formdata, 'login');
    if (formIsValid) {
      this.props.logInUser(dataSubmit);
    } else {
      this.setState({ formError: true });
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
            <div className='error_label'>Please check your data</div>
          ) : null}
          <button onClick={event => this.submitForm(event)}>LogIn</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  { logInUser }
)(withRouter(Login));
