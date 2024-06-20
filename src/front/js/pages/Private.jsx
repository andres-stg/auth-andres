// En tu archivo Private.jsx
import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const Private = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout();
    };

    return (
        <div className="container text-center mt-5">
            <h2>Welcome to the Private Dashboard!</h2>
            <p>This page is only accessible to authenticated users.</p>
        </div>
    );
};

