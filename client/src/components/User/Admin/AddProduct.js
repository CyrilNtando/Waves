import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getBrands,
  getWoods,
  addProduct,
  clearProduct
} from '../../../store/actions/productActions';
import FormField from '../../utils/Form/FormField';
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields,
  resetFields
} from '../../utils/Form/FormActions';
import FileUpload from '../../utils/Form/FileUpload';
import { removeError } from '../../../store/actions/errorAction';
import UserLayout from '../../../hoc/UserLayout';

class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product Name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter product name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product Description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter product description'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },

      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Product Price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter product price'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'Product Brand',
          name: 'brand_input',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shipping_input',
          options: [{ key: true, value: 'Yes' }, { key: false, value: 'No' }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available, in Stock',
          name: 'available_input',
          options: [{ key: true, value: 'Yes' }, { key: false, value: 'No' }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      wood: {
        element: 'select',
        value: '',
        config: {
          label: 'Wood Material',
          name: 'wood_input',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      frets: {
        element: 'select',
        value: '',
        config: {
          label: 'Frets',
          name: 'frets_input',
          options: [
            { key: 20, value: 20 },
            { key: 21, value: 21 },
            { key: 22, value: 22 },
            { key: 24, value: 24 }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish_input',
          options: [
            { key: true, value: 'Public' },
            { key: false, value: 'Hidden' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showlabel: false
      }
    }
  };
  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'products');
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  resetFieldHandler = () => {
    const newformData = resetFields(this.state.formdata, 'products');

    this.setState({
      formdata: newformData,
      formSuccess: true
    });

    setTimeout(() => {
      this.setState({ formSuccess: false });
    }, 3000);
  };
  submitForm = event => {
    event.preventDefault();
    let dataSubmit = generateData(this.state.formdata, 'products');
    let formIsValid = isFormValid(this.state.formdata, 'products');
    if (formIsValid) {
      this.props.addProduct(dataSubmit);
    }
  };
  componentDidMount() {
    this.props.getBrands();
    this.props.getWoods();
  }
  componentWillUnmount() {
    this.props.clearProduct();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.products.addedProduct) {
        if (this.props.products.addedProduct.success === true) {
          this.resetFieldHandler();
          removeError();
        }
      } else if (prevProps.error !== this.props.error) {
        console.log(this.props.error);
        this.setState({ formError: true });
        removeError();
      }
      /********************************* */
      const formdata = this.state.formdata;
      let newFormData;
      newFormData = populateOptionFields(
        formdata,
        this.props.products.brands,
        'brand'
      );
      this.updateFields(newFormData);
      /****************************** */
      newFormData = populateOptionFields(
        formdata,
        this.props.products.woods,
        'wood'
      );
      this.updateFields(newFormData);
    }
  }

  updateFields = newFormData => {
    this.setState({
      formdata: newFormData
    });
  };

  imagesHandler = images => {
    const newFromData = {
      ...this.state.formdata
    };

    newFromData['images'].value = images;
    newFromData['images'].valid = true;

    this.setState({
      formdata: newFromData
    });
  };
  render() {
    return (
      <UserLayout>
        <h1>Add Product</h1>
        <form onSubmit={event => this.submitForm(event)}>
          <FileUpload
            imagesHandler={images => this.imagesHandler(images)}
            reset={this.state.formSuccess}
          />
          <FormField
            id={'name'}
            formdata={this.state.formdata.name}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'description'}
            formdata={this.state.formdata.description}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'price'}
            formdata={this.state.formdata.price}
            change={element => this.updateForm(element)}
          />
          <div className='form_devider' />
          <FormField
            id={'brand'}
            formdata={this.state.formdata.brand}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'shipping'}
            formdata={this.state.formdata.shipping}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'available'}
            formdata={this.state.formdata.available}
            change={element => this.updateForm(element)}
          />
          <div className='form_devider' />
          <FormField
            id={'wood'}
            formdata={this.state.formdata.wood}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'frets'}
            formdata={this.state.formdata.frets}
            change={element => this.updateForm(element)}
          />
          <div className='form_devider' />
          <FormField
            id={'publish'}
            formdata={this.state.formdata.publish}
            change={element => this.updateForm(element)}
          />
          {this.state.formSuccess ? (
            <div className='form_success'>Sucessfully Added...</div>
          ) : null}
          {this.state.formError ? (
            <div className='error_label'>Please check your data</div>
          ) : null}
          <button onClick={event => this.submitForm(event)}>Add Product</button>
        </form>
      </UserLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products,
    error: state.error
  };
};
export default connect(
  mapStateToProps,
  { getBrands, getWoods, addProduct, clearProduct }
)(AddProduct);
