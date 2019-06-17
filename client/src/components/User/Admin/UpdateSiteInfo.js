import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../../utils/Form/FormField';
import {
  getSiteData,
  updateSiteData
} from '../../../store/actions/siteActions';
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from '../../utils/Form/FormActions';
class UpdateSiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      address: {
        element: 'input',
        value: '',
        config: {
          label: 'Address',
          name: 'address_input',
          type: 'text',
          placeholder: 'Enter the site address'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      hours: {
        element: 'input',
        value: '',
        config: {
          label: 'Working Hours',
          name: 'hours_input',
          type: 'text',
          placeholder: 'Enter the site working Hours'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },

      phone: {
        element: 'input',
        value: '',
        config: {
          label: 'Phone Number',
          name: 'phone_input',
          type: 'text',
          placeholder: 'Enter the Phone Number'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },

      email: {
        element: 'input',
        value: '',
        config: {
          label: 'Shop Email',
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
        validationMessage: '',
        showlabel: true
      }
    }
  };

  componentDidMount() {
    this.props.getSiteData().then(() => {
      console.log(this.props.site.siteData[0]);
      const newFormData = populateFields(
        this.state.formdata,
        this.props.site.siteData[0]
      );
      this.setState({
        formdata: newFormData
      });
    });
  }
  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'site_info');
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };
  submitForm = event => {
    event.preventDefault();
    let dataSubmit = generateData(this.state.formdata, 'site_info');
    let formIsValid = isFormValid(this.state.formdata, 'site_info');
    if (formIsValid) {
      this.props.updateSiteData(dataSubmit).then(() => {
        this.setState({ formSuccess: true }, () => {
          setTimeout(() => {
            this.setState({ formSuccess: false });
          }, 2000);
        });
      });
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={event => this.submitForm(event)}>
          <h1>Site Info</h1>
          <FormField
            id={'address'}
            formdata={this.state.formdata.address}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'hours'}
            formdata={this.state.formdata.hours}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'phone'}
            formdata={this.state.formdata.phone}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={element => this.updateForm(element)}
          />
          <div>
            {this.state.formSuccess ? (
              <div className='form_success'>Success</div>
            ) : null}
            {this.state.formError ? (
              <div className='error_label'>Please check your data</div>
            ) : null}
            <button onClick={event => this.submitForm(event)}>
              Update Site
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.site
  };
};
export default connect(
  mapStateToProps,
  { getSiteData, updateSiteData }
)(UpdateSiteInfo);
