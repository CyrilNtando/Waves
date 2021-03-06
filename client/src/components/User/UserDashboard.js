import React from 'react';
import UserLayout from '../../hoc/UserLayout';
import Button from '../utils/Button';
import HistoryBlock from '../utils/User/HistoryBlock';
function UserDashboard({ user }) {
  return (
    <UserLayout isAdmin={user.isAdmin}>
      <div>
        <div className='user_nfo_panel'>
          <h1>User Infomartion</h1>
          <div className=''>
            <span>{user.name}</span>
            <span>{user.lastname}</span>
            <span>{user.email}</span>
          </div>
          <Button
            type='default'
            title='Edit Account Info'
            LinkTo='/user/user_profile'
          />
        </div>
        {user.history ? (
          <div className='user_nfo_panel'>
            <h1>History Purchases</h1>
            <div className='user_product_block_wrapper'>
              <HistoryBlock product={user.history} />
            </div>
          </div>
        ) : null}
      </div>
    </UserLayout>
  );
}

export default UserDashboard;
