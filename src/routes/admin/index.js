import React from 'react';
import { Logout } from '../../utils/auth-api';

const Admin = () => (
    <div>
        <h1>Admin Page</h1>
        <p>stuffs</p>
        <button type="button" onClick={Logout}>Log Out</button>
    </div>
);

export default Admin;
