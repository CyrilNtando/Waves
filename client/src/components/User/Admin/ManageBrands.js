import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBrands, addBrand } from '../../../store/actions/productActions';
import FormField from '../../utils/Form/FormField';
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from '../../utils/Form/FormActions';
class ManageBrands extends Component {
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
          placeholder: 'Enter Brand Name'
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
    const newFormdata = update(element, this.state.formdata, 'brands');
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  resetFieldsHandler = () => {
    const newformData = resetFields(this.state.formdata, 'brands');
    this.setState({
      formdata: newformData,
      formSuccess: true
    });
  };
  submitForm = event => {
    event.preventDefault();
    let dataSubmit = generateData(this.state.formdata, 'brands');
    let formIsValid = isFormValid(this.state.formdata, 'brands');
    let existingBrands = this.props.products.brands;
    if (formIsValid) {
      this.props
        .dispatch(addBrand(dataSubmit, existingBrands))
        .then(response => {
          if (response.payload.success) {
            this.resetFieldsHandler();
          } else {
            this.setState({ formError: true });
          }
        });
    }
  };
  componentDidMount() {
    this.props.dispatch(getBrands());
  }
  showCategoryItems = () => {
    return this.props.products.brands
      ? this.props.products.brands.map((item, i) => {
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
        <h2>Brands</h2>
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
                Add Brand
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
export default connect(mapStateToProps)(ManageBrands);
