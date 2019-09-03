import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        <h1>Home Page</h1>
        <Link to="/admin/flow-builder">Goto Flow Builder</Link>
    </div>
);

export default Home;
