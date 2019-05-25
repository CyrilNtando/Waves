import React from 'react';
import Button from '../utils/Button';
import Login from './Login';
const RegisterLogin = () => {
  return (
    <div className='page_container'>
      <div className='container'>
        <div className='register_login_container'>
          <div className='left'>
            <h1>New Customers</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero non
              rem unde eaque laboriosam fuga. Autem hic, voluptatibus natus,
              doloribus tempora placeat itaque animi fugiat asperiores rem,
              tempore adipisci non?
            </p>
            <Button
              type='default'
              title='Create an account'
              LinkTo='/register'
              addStyles={{
                margin: '10px 0  0 0'
              }}
            />
          </div>
          <div className='right'>
            <h2>Registered Customers</h2>
            <p>If you have an account please log in.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
