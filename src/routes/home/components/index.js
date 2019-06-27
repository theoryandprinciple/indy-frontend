import React from 'react';
import { history } from '../../../store';

const Admin = () => (
    <div>
        <h1>Basic Home Page</h1>
        <p>stuffs</p>
        <button type="button" onClick={() => history.push('/admin')}>Admin</button>
    </div>
);

export default Admin;
