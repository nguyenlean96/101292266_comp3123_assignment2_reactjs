import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const log = (whatever) => console.log(whatever);

function EmpView(props) {
	const [status, setStatus] = useState({ status: false, message: "" });
	const [empDat, setEmpDat] = useState({});
	useEffect(() => {
		if (sessionStorage.getItem("user") === null) {
			window.location.replace("/login");
		}
		const queryParams = new URLSearchParams(window.location.search);
		const id = queryParams.get("id");

		employeeDataFetching(id);
	}, []);
	const employeeDataFetching = async (id) => {
		await axios
			.get(`https://comp3123assignment.herokuapp.com/api/emp/employees/${id}`)
			.then((res) => setEmpDat(res.data))
			.catch((err) => err.response.data)
			.then((res) => {
				if (res) {
					setStatus({
						status: res.status,
						message: res.message ? res.message : res.error,
					});
				}
			});
	};
	return (
		<div className="container">
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
			<div className="px-5 my-3">
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
				<hr />
			</div>
			<div className="m-5 d-flex justify-content-center">
				<div className="rounded-3 border px-4 py-3 w-75">
					<div className="d-flex flex-column justify-content-center">
						<div className="container">
							<div className="container">
								<h3>{"View Employee Details"}</h3>
								<hr />
							</div>
							<div className="container">
								<div className="row">
									{/* First Name: */}
									<div className="col-md-6">
										<div>{"First Name:"}</div>
										<div
											className={empDat.first_name ? "" : "placeholder-glow"}
										>
											{empDat.first_name ? (
												<h3>{empDat.first_name}</h3>
											) : (
												<h3 className="placeholder col-12">{}</h3>
											)}
										</div>
									</div>
									{/* Last Name: */}
									<div className="col-md-6">
										<div>{"Last Name:"}</div>
										<div
											className={empDat.first_name ? "" : "placeholder-glow"}
										>
											{empDat.last_name ? (
												<h3>{empDat.last_name}</h3>
											) : (
												<h3 className="placeholder col-12">{}</h3>
											)}
										</div>
									</div>
								</div>
								{/* Gender */}
								<div>
									<div className="col-md-6">
										<div>{"Gender:"}</div>
										<div className={empDat.gender ? "" : "placeholder-glow"}>
											{empDat.last_name ? (
												<p>{empDat.gender}</p>
											) : (
												<p className="placeholder col-12">{}</p>
											)}
										</div>
									</div>
								</div>
								{/* Email */}
								<div>
									<div>{"Email: "}</div>
									<div
										className={
											"col-7 " + (empDat.email ? "" : "placeholder-glow")
										}
									>
										<div>
											{empDat.email ? (
												<h3>{empDat.email}</h3>
											) : (
												<h3 className="placeholder col-12">{}</h3>
											)}
										</div>
									</div>
								</div>
								{/* Salary */}
								<div>
									<div className="mb-2">{"Salary: "}</div>
									<div>
										<div className="d-flex align-items-center">
											<div className="ms-1">
												<h4>{"$"}</h4>
											</div>
											<div
												className={
													"ms-1 row w-100" +
													(empDat.salary ? "" : " placeholder-glow")
												}
											>
												<h3
													className={
														"col-5" + (empDat.salary ? "" : " placeholder")
													}
												>
													{empDat.salary ? empDat.salary : ""}
												</h3>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default EmpView;
