import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/Form/FormField';
import {
  update,
  generateData,
  isFormValid
} from '../../components/utils/Form/FormActions';
import { registerUser } from '../../store/actions/userAction';
import Dialog from '@material-ui/core/Dialog';
class Register extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname_input',
          type: 'text',
          placeholder: 'Enter your lastName'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
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
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'password',
          placeholder: 'Confirm your Password'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.success) {
      this.setState({ formError: false, formSuccess: true });
      setTimeout(() => {
        nextProps.history.push('/register_login');
      }, 3000);
    } else {
      this.setState({ formError: true });
    }
  }
  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'register');
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };
  submitForm = event => {
    event.preventDefault();
    let dataSubmit = generateData(this.state.formdata, 'register');
    let formIsValid = isFormValid(this.state.formdata, 'register');
    if (formIsValid) {
      this.props.registerUser(dataSubmit);
      this.setState({
        formError: false,
        formSuccess: true
      });
      setTimeout(() => {
        this.props.history.push('/register_login');
      }, 3000);
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className='page_wrapper'>
        <div className='container'>
          <div className='register_login_container'>
            <div className='left'>
              <form onSubmit={event => this.submitForm(event)}>
                <h2>Personal Information</h2>
                <div className='form_block_two'>
                  <div className='block'>
                    <FormField
                      id={'name'}
                      formdata={this.state.formdata.name}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='block'>
                    <FormField
                      id={'lastname'}
                      formdata={this.state.formdata.lastname}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    id={'email'}
                    formdata={this.state.formdata.email}
                    change={element => this.updateForm(element)}
                  />
                </div>
                <h2>Verify Password</h2>
                <div className='form_block_two'>
                  <div className='block'>
                    <FormField
                      id={'password'}
                      formdata={this.state.formdata.password}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='block'>
                    <FormField
                      id={'confirmPassword'}
                      formdata={this.state.formdata.confirmPassword}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  {this.state.formError ? (
                    <div className='error_label'>Please check your data</div>
                  ) : null}
                  <button onClick={event => this.submitForm(event)}>
                    Create an Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Dialog open={this.state.formSuccess}>
          <div className='dialog_alert'>
            <div className=''>Congrutulations</div>
            <div className=''>
              You will be redirected to LOGIN in a cuople seconds....
            </div>
          </div>
        </Dialog>
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
  { registerUser }
)(Register);
