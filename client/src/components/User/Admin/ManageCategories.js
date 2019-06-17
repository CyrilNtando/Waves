import React from 'react';
import UserLayout from '../../../hoc/UserLayout';
import ManageBrands from './ManageBrands';
import ManageWoods from './ManageWoods';
function ManageCategories() {
  return (
    <div>
      <UserLayout>
        <ManageBrands />
        <ManageWoods />
      </UserLayout>
    </div>
  );
}
export default ManageCategories;
