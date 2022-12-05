import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { json } from "react-router-dom";

const log = (whatever) => console.log(whatever);

const jsonObjHasValue = (obj) => {
	if (obj.first_name && obj.last_name && obj.gender && obj.email && obj.salary)
		return true;
	return false;
};

function EmpForm(props) {
	const [mode, setMode] = useState(null);
	const [empDat, setEmpDat] = useState({
		first_name: "",
		last_name: "",
		email: "",
		gender: "",
		salary: "",
	});
	const [status, setStatus] = useState({ status: false, message: "" });

	useEffect(() => {
		if (sessionStorage.getItem("user") === null) {
			window.location.replace("/login");
		}
		form_init();
	}, []);

	const form_init = async () => {
		const queryParams = new URLSearchParams(window.location.search);
		const new_mode = await queryParams.get("mode");
		const id = await queryParams.get("eid");
		if (id) {
			await getEmpInfo(id);
		} else {
			await setMode(Boolean(new_mode));
		}
	};

	const getEmpInfo = async (id) => {
		await axios
			.get(`https://comp3123assignment.herokuapp.com/api/emp/employees/${id}`)
			.then((res) => {
				if (res.data) {
					setEmpDat(res.data);
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

	const onSaveEmp = async (e, eid) => {
		if (mode) {
			await axios
				.post(
					`https://comp3123assignment.herokuapp.com/api/emp/employees`,
					empDat
				)
				.then((res) => {
					if (res.data) {
						setStatus({ status: res.data.status, message: res.data.message });
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
		} else {
			await axios
				.put(
					`https://comp3123assignment.herokuapp.com/api/emp/employees/${eid}`,
					empDat
				)
				.then((res) => {
					if (res.data) {
						setStatus({ status: res.data.status, message: res.data.message });
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
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		onSaveEmp(e, empDat._id);
	};
	const onClear = (e) => {
		e.preventDefault();
		setEmpDat({
			first_name: "",
			last_name: "",
			email: "",
			salary: "",
			gender: "",
		});
	};
	return (
		<div className="row">
			<div className="py-2 px-5 mt-3 d-flex justify-content-center">
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
			<div className="px-5 mb-3">
				<NavLink className="btn btn-outline-secondary px-3" to="/emp">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-chevron-left"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
						/>
					</svg>
					Back
				</NavLink>
			</div>
			<hr />
			<div className="d-flex justify-content-center">
				<div className="rounded-3 border mx-5 my-2 py-1 px-3 w-50">
					<div className="px-4 py-3">
						<h4>{(mode === true ? "Add New" : "Update") + " Employee"}</h4>
						<hr />
					</div>
					<div>
						<div>
							<div>
								<div className="row">
									{/* First Name: */}
									<div className="col-md-6">
										<div className="form-floating mb-3">
											<input
												type="text"
												className="form-control"
												placeholder="name@example.com"
												value={empDat.first_name}
												onChange={(e) => {
													e.preventDefault();
													log(empDat.first_name);
													setEmpDat((other) => ({
														...other,
														first_name: e.target.value,
													}));
												}}
											/>
											<label>First Name</label>
										</div>
									</div>
									{/* Last Name: */}
									<div className="col-md-6">
										<div className="form-floating mb-3">
											<input
												type="text"
												className="form-control"
												placeholder="name@example.com"
												value={empDat.last_name}
												onChange={(e) => {
													e.preventDefault();
													log(empDat.last_name);
													setEmpDat((other) => ({
														...other,
														last_name: e.target.value,
													}));
												}}
											/>
											<label>Last Name</label>
										</div>
									</div>
								</div>
								<hr />
								{/* Salary */}
								<div className="col-md-6">
									<div>{"Gender:"}</div>
									<div className="ms-3">
										<div className="form-check">
											<input
												className="form-check-input"
												type="radio"
												checked={empDat.gender === "male"}
												onChange={(e) => {
													setEmpDat((other) => ({
														...other,
														gender: "male",
													}));
												}}
											/>
											<label className="form-check-label">Male</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="radio"
												checked={empDat.gender === "female"}
												onChange={(e) => {
													setEmpDat((other) => ({
														...other,
														gender: "female",
													}));
												}}
											/>
											<label className="form-check-label">Female</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="radio"
												checked={empDat.gender === "other"}
												onChange={(e) => {
													setEmpDat((other) => ({
														...other,
														gender: "other",
													}));
												}}
											/>
											<label className="form-check-label">
												Prefers not to say
											</label>
										</div>
									</div>
								</div>
								<hr />
								{/* Email */}
								<div className="col-12">
									<div className="form-floating mb-3">
										<input
											type="email"
											className="form-control"
											placeholder="name@example.com"
											value={empDat.email ? empDat.email : ""}
											onChange={(e) => {
												e.preventDefault();
												log(empDat.email);
												setEmpDat((other) => ({
													...other,
													email: e.target.value,
												}));
											}}
										/>
										<label>Email</label>
									</div>
								</div>
								{/* Salary */}
								<div className="col-md-6">
									<div className="mb-2">{"Salary:"}</div>
									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text">CA$</span>
										</div>
										<input
											type="text"
											className="form-control"
											aria-label="Amount (to the nearest dollar)"
											value={empDat.salary ? empDat.salary : ""}
											onChange={(e) => {
												e.preventDefault();
												log(empDat.salary);
												setEmpDat((other) => ({
													...other,
													salary: e.target.value,
												}));
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-6 text-center">
							<button
								type="submit"
								onClick={(e) => onSubmit(e)}
								className="btn btn-primary px-5"
							>
								Save
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
				</div>
			</div>
		</div>
	);
}
export default EmpForm;
