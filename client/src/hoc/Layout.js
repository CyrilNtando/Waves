import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header_footer/header/Header';
import Footer from '../components/header_footer/footer/Footer';
import { getSiteData } from '../store/actions/siteActions';
class Layout extends Component {
  componentDidMount() {
    if (Object.keys(this.props.site).length === 0) {
      this.props.getSiteData().then(() => {});
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div className='page_container'>{this.props.children}</div>
        <Footer data={this.props.site} />
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
  { getSiteData }
)(Layout);
