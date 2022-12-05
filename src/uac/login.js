import axios from "axios";
import React, { userEffect } from "react";
import { NavLink } from "react-router-dom";
const log = (whatever) => console.log(whatever);
function Login(props) {
	if (sessionStorage.getItem("user") !== null) {
		window.location.href = "/emp";
	}
	const [status, setStatus] = React.useState({ status: "", message: "" });
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");

	const logginInValidate = async (user) => {
		await axios
			.post("https://comp3123assignment.herokuapp.com/api/user/login", user)
			.then((res) => {
				if (res.data) {
					setStatus({ status: res.data.status, message: res.data.message });
					sessionStorage.setItem("user", username);
					window.location.href = "/emp";
				}
			})
			.catch((error) => error.response.data)
			.then((res) => {
				if (res) {
					setStatus({
						status: res.status,
						message: res.message ? res.message : res.error,
					});
				}
			});
	};

	const onLogin = (e) => {
		e.preventDefault();
		const user = { username: username, password: password };
		logginInValidate(user);
	};
	const onClear = (e) => {
		e.preventDefault();
		setUsername("");
		setPassword("");
	};

	return (
		<div className="mt-5">
			<div className="py-2 px-5 d-flex justify-content-center">
				{status.message ? (
					status.status === true ? (
						<div
							className="alert alert-success d-flex align-items-center p-1 px-5 m-0 w-25"
							role="alert"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-check-lg"
								viewBox="0 0 16 16"
							>
								<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
							</svg>
							<div className="ms-1">{status.message}</div>
						</div>
					) : (
						<div
							className="alert alert-danger d-flex align-items-center"
							role="alert"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-exclamation-triangle"
								viewBox="0 0 16 16"
							>
								<path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
								<path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
							</svg>
							<div className="ms-2">{status.message}</div>
						</div>
					)
				) : (
					""
				)}
			</div>
			<div className="container w-50 mt-5 pt-5">
				<div>
					<h3 className="mb-4">Log In</h3>
				</div>
				<hr />
				<form className="mt-4">
					<div className="form-floating mb-3">
						<input
							type="text"
							className="form-control"
							id="floatingInput"
							placeholder="name@example.com"
							value={username}
							onChange={(e) => {
								e.preventDefault();
								setUsername(e.target.value);
							}}
						/>
						<label htmlFor="floatingInput">Email address or Username</label>
					</div>
					<div className="form-floating mb-3">
						<input
							type="password"
							className="form-control"
							id="floatingPassword"
							placeholder="Password"
							value={password}
							onChange={(e) => {
								e.preventDefault();
								setPassword(e.target.value);
							}}
						/>
						<label htmlFor="floatingPassword">Password</label>
					</div>
					<div className="text-center">
						<NavLink to="/signup">Register new account?</NavLink>
					</div>
					<hr />
					<div className="row">
						<div className="col-6 text-center">
							<button
								type="submit"
								className="btn btn-primary px-5"
								onClick={(e) => onLogin(e)}
								disabled={username === "" || password === ""}
							>
								Submit
							</button>
						</div>
						<div className="col-6 text-center">
							<button
								type="submit"
								className="btn btn-secondary px-5"
								onClick={(e) => onClear(e)}
							>
								Clear
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
export default Login;
