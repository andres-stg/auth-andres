import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const response = await fetch(`https://ominous-goldfish-g9j79767rxx2567-3001.app.github.dev/api/signup`, {  
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || "Signup failed");
            }

            // Redirect to home or any other page on successful signup
            navigate("/");
        } catch (error) {
            console.error("Signup error:", error.message);
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <div className="container text-center mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-header bg-primary text-white">
                            <h2>Enter your user info</h2>
                        </div>
                        <div className="card-body">
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
                            <button onClick={handleSignUp} className="btn btn-success w-100">Lets start</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
