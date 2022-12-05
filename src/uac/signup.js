import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
const { Toast } = require("react-bootstrap");
const log = (whatever) => console.log(whatever);

function Signup() {
	const [userInfo, setUserInfo] = React.useState({
		username: "",
		email: "",
		password: "",
	});

	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [userPasswd, setUserPasswd] = React.useState("");
	const [userRePasswd, setUserRePasswd] = React.useState("");
	const [validReEnterPasswd, setValidReEnterPasswd] = React.useState(false);
	const [status, setStatus] = React.useState({ status: "", message: "" });

	const [toast, setToast] = React.useState(false);
	const onsubmit = (e) => {
		e.preventDefault();
		const user = { username: username, email: email, password: userPasswd };
		userSigningUp(user);
		log(status);
	};

	const userSigningUp = async (user) => {
		await axios
			.post("https://comp3123assignment.herokuapp.com/api/user/signup", user)
			.then((res) => {
				if (res.data) {
					setStatus({ status: res.data.status, message: res.data.message });
				}
			})
			.catch((error) => error.response.data)
			.then((res) =>
				setStatus({
					status: res.status,
					message: res.message ? res.message : res.error,
				})
			);
	};

	const onClearForm = (e) => {
		e.preventDefault();
		setUsername("");
		setEmail("");
		setUserPasswd("");
		setUserRePasswd("");
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
					<h3 className="mb-4">Sign up new user</h3>
				</div>
				<hr />
				<form className="mt-4">
					<div className="form-floating mb-3">
						<input
							type="text"
							className="form-control"
							id="floatingInput"
							placeholder="Please enter your username here"
							value={username}
							onChange={(e) => {
								e.preventDefault();
								setUsername(e.target.value);
							}}
						/>
						<label htmlFor="floatingInput">Username</label>
					</div>
					<div className="form-floating mb-3">
						<input
							type="email"
							className="form-control"
							id="floatingInput"
							value={email}
							onChange={(e) => {
								e.preventDefault();
								setEmail(e.target.value);
							}}
							placeholder="name@example.com"
						/>
						<label htmlFor="floatingInput">Email address</label>
					</div>
					<div className="row">
						<div className="col-6">
							<div className="form-floating mb-3">
								<input
									type="password"
									className="form-control"
									id="floatingPassword"
									placeholder="Password"
									value={userPasswd}
									onChange={(e) => {
										e.preventDefault();
										setUserPasswd(e.target.value);
									}}
								/>
								<label htmlFor="floatingPassword">Password</label>
							</div>
						</div>
						<div className="col-6">
							<div className="form-floating mb-3">
								<input
									type="password"
									className="form-control"
									id="floatingPassword"
									placeholder="Password"
									value={userRePasswd}
									onChange={(e) => {
										e.preventDefault();
										setUserRePasswd(e.target.value);
										if (e.target.value === userPasswd) {
											setValidReEnterPasswd(true);
										}
									}}
								/>
								<label htmlFor="floatingPassword">Re-entered Password</label>
							</div>
						</div>
					</div>
					<div className="text-center">
						<NavLink to="/login">Already had an account? Log In</NavLink>
					</div>
					<hr />
					<div className="row">
						<div className="col-6 text-center">
							<button
								type="submit"
								className="btn btn-primary px-5"
								disabled={!validReEnterPasswd}
								onClick={(e) => onsubmit(e)}
							>
								Submit
							</button>
						</div>
						<div className="col-6 text-center">
							<button
								type="submit"
								className="btn btn-secondary px-5"
								onClick={(e) => onClearForm(e)}
							>
								Clear
							</button>
						</div>
					</div>
				</form>
			</div>
			<div></div>
		</div>
	);
}
export default Signup;
