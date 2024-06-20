import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleClick = () => {
        actions.login(email, password);
    };

    useEffect(() => {
        if (store.token && store.token !== "" && store.token !== undefined) {
            navigate("/private");
        }
    }, [store.token, navigate]);

    // Añade un efecto para redirigir a Home después de cerrar sesión
    useEffect(() => {
        if (!store.token) {
            navigate("/");
        }
    }, [store.token, navigate]);

    return (
        <div className="container text-center mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-header bg-primary text-white">
                            <h2>Login</h2>
                        </div>
                        <div className="card-body">
                            {store.token && store.token !== "" && store.token !== undefined ? (
                                <p>You are logged in with this token: {store.token}</p>
                            ) : (
                                <>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <button onClick={handleClick} className="btn btn-success w-100">Login</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



