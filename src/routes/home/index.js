import React from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../wiring/history';

const Admin = () => (
    <div>
        <h1>Basic Home Page</h1>
        <p>stuffs</p>
        <button type="button" onClick={() => history.push('/admin')}>Admin</button>
        <br />
        <Link to="/admin">Admin Link</Link>
    </div>
);

export default Admin;
