import React from 'react';
import UserLayout from '../../hoc/UserLayout';
import PersonalInfo from './PersonalInfo';
function UserProfile() {
  return (
    <div>
      <UserLayout>
        <h1>Porfile</h1>
        <PersonalInfo />
      </UserLayout>
    </div>
  );
}

export default UserProfile;
