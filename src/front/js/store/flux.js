import { useNavigate } from 'react-router-dom';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			isAuthenticated: false,
			user: null,
			token: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				setStore({ token: null })
			},

            logout: () => {
                sessionStorage.removeItem("token");
                setStore({ isAuthenticated: false, user: null, token: null });
                navigate("/");;
			},

			login: async (email, password) => {
				try {
					const opts = {
						method: 'POST',
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					};

					const resp = await fetch(`https://ominous-goldfish-g9j79767rxx2567-3001.app.github.dev/api/token`, opts);
					if (resp.status !== 200) {
						alert("Something happened :(");
						return false;
					}
					const data = await resp.json();
					console.log("This came from the backend:", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ isAuthenticated: true, user: email, token: data.access_token });
					navigate("/private")
				} catch (error) {
					console.error("There was an error loggin in!", error);
				}
			},

			signup: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/users", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});
					if (!response.ok) throw new Error("Signup failed");
					setStore({ user: email });
					navigate("/private");
				} catch (error) {
					console.error("Signup error:", error);
					return false;
				}
			},


			getMessage: async () => {
				try {
					// fetching data from the backend
					const store = getStore();
					const opts = {
						headers: {
							"Authorization": "Bearer " + store.token
						}
					}
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello", opts);
					const data = await resp.json();
					setStore({ message: data.message });
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			signup: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/users", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});
					if (!response.ok) throw new Error("Signup failed");
					setStore({ user: email });
				} catch (error) {
					console.error("Signup error:", error);
				}
			},

			logout: () => {
				setStore({ isAuthenticated: false, user: null, token: null });
			}
		}
	};
};

export default getState;
