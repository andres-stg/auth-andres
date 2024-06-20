import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Sign and Log In</span>
				</Link>
				<div className="ml-auto">
					{!store.token ?
						<Link to="/signup">
							<button className="btn btn-primary">Dont have an account? Sign up</button>
						</Link>
						:
						<Link to="/">
							<button onClick={() => {
								actions.logout();
							}} className="btn btn-primary">Log Out</button>
						</Link>
					}
				</div>
			</div>
		</nav>
	);
};
