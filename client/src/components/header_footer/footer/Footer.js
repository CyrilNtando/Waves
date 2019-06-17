import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
const Footer = ({ data }) => {
  return data.siteData ? (
    <div>
      <footer className='bck_b_dark'>
        <div className='container'>
          <div className='logo'>Waves</div>
          <div className='wrapper'>
            <div className='left'>
              <h2>Contact Information</h2>
              <div className='business_nfo'>
                <div className='tag'>
                  <FontAwesomeIcon icon={faCompass} className='icon' />
                  <div className='nfo'>
                    <div>Address</div>
                    <div>{data.siteData[0].address}</div>
                  </div>
                </div>
                <div className='tag'>
                  <FontAwesomeIcon icon={faPhone} className='icon' />
                  <div className='nfo'>
                    <div>Phone</div>
                    <div>{data.siteData[0].phone}</div>
                  </div>
                </div>

                <div className='tag'>
                  <FontAwesomeIcon icon={faClock} className='icon' />
                  <div className='nfo'>
                    <div>Working Hours</div>
                    <div>{data.siteData[0].hours}</div>
                  </div>
                </div>
                <div className='tag'>
                  <FontAwesomeIcon icon={faEnvelope} className='icon' />
                  <div className='nfo'>
                    <div>Email</div>
                    <div>{data.siteData[0].email}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='left'>
              <h2>Be the fist to know</h2>
              <div>
                <p>
                  Get all the latest information on events, sales and offers.
                  You can miss out
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  ) : null;
};

export default Footer;
