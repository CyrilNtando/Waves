import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWoods, addWood } from '../../../store/actions/productActions';
import FormField from '../../utils/Form/FormField';
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from '../../utils/Form/FormActions';
class ManageWoods extends Component {
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
          placeholder: 'Enter Wood Name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'woods');
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };
  resetFieldsHandler = () => {
    const newformData = resetFields(this.state.formdata, 'woods');
    this.setState({
      formdata: newformData,
      formSuccess: true
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataSubmit = generateData(this.state.formdata, 'woods');
    let formIsValid = isFormValid(this.state.formdata, 'woods');
    let existingWoods = this.props.products.woods;
    if (formIsValid) {
      this.props.dispatch(addWood(dataSubmit, existingWoods)).then(response => {
        if (response.payload.success) {
          this.resetFieldsHandler();
        } else {
          this.setState({ formError: true });
        }
      });
    }
  };
  componentDidMount() {
    this.props.dispatch(getWoods());
  }
  showCategoryItems = () => {
    return this.props.products.woods
      ? this.props.products.woods.map((item, i) => {
          return (
            <div className='category_item' key={item._id}>
              {item.name}
            </div>
          );
        })
      : null;
  };
  render() {
    return (
      <div className='admin_category_wrapper'>
        <h2>Woods</h2>
        <div className='admin_two_column'>
          <div className='left'>
            <div className='brands_container'>{this.showCategoryItems()}</div>
          </div>
          <div className='right'>
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={'name'}
                formdata={this.state.formdata.name}
                change={element => this.updateForm(element)}
              />
              {this.state.formError ? (
                <div className='error_label'>Please check your data</div>
              ) : null}
              <button onClick={event => this.submitForm(event)}>
                Add Wood
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});
export default connect(mapStateToProps)(ManageWoods);
