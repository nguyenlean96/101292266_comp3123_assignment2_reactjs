import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	NavLink,
} from "react-router-dom";

const log = (whatever) => console.log(whatever);

const INITIAL_VALUES = {
	employees: [
		{
			fname: "Pritesh",
			lname: "Patel",
			email: "p@p.com",
		},
		{
			fname: "MOKSH",
			lname: "PATEL",
			email: "M@M.COM",
		},
		{
			fname: "Brad",
			lname: "Gibson",
			email: "b@b.com",
		},
		{
			fname: "Clarisse",
			lname: "Lecomte",
			email: "c@c.com",
		},
	],
};
class Employee extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			employees: [],
			editForm: {
				title: "Update Employee",
				data: {
					fname: "",
					lname: "",
					email: "",
				},
			},
			viewForm: {
				title: "View Employee Details",
				data: {
					fname: "",
					lname: "",
					email: "",
				},
			},
			viewEmp: false,
			editEmp: false,
			status: {},
		};
	}
	componentDidMount = () => {
		if (sessionStorage.getItem("user") === null) {
			window.location.replace("/login");
		}
		this.getEmployees();
	};
	getEmployees = async () => {
		await axios
			.get("https://comp3123assignment.herokuapp.com/api/emp/employees")
			.then((res) =>
				this.setState((state) => ({ ...state, employees: res.data }))
			)
			.catch((err) => {
				console.log(err);
			});
	};
	handleViewClose = () => this.setState({ viewEmp: false });
	handleViewShow = (event, id) => {
		event.preventDefault();
		let viewEmp = this.state.employees[id];
		this.setState({
			viewForm: {
				title: "View Employee Details",
				data: {
					fname: viewEmp.fname,
					lname: viewEmp.lname,
					email: viewEmp.email,
				},
			},
		});
		this.setState({ viewEmp: true });
	};

	handleEditClose = () => this.setState({ editEmp: false });
	handleEditShow = (event, id) => {
		if (id != null) {
			let chosen_one = this.state.employees[id];
			this.setState({
				editForm: {
					title: "Update Employee",
					data: {
						fname: chosen_one.first_name,
						lname: chosen_one.last_name,
						email: chosen_one.email,
					},
				},
			});
		} else {
			this.setState({
				editForm: {
					title: "Add Employee",
					data: {
						fname: "",
						lname: "",
						email: "",
					},
				},
			});
		}
		this.setState({ editEmp: true });
	};

	onValueChanged = (event) => {
		event.preventDefault();
		let name = event.target.name;
		let value = event.target.value;
		this.setState({
			editForm: {
				data: {
					[name]: value,
				},
			},
		});
	};
	onRemoveEmployee = (event, id) => {
		event.preventDefault();
		let employees = this.state.employees;
		employees.splice(id, 1);
		this.setState({ employees: employees });
	};

	handleEditSubmit = (event) => {
		event.preventDefault();
	};
	onDeleteEmployee = async (event, id) => {
		event.preventDefault();
		await axios
			.delete(
				`https://comp3123assignment.herokuapp.com/api/emp/employees?eid=${id}`
			)
			.then((res) => {
				if (res.data) {
					this.setState((curr) => ({
						...curr,
						status: { status: res.data.status, message: res.data.message },
					}));
				}
			})
			.catch((error) => error.response.data)
			.then((res) => {
				if (res) {
					this.setState((curr) => ({
						...curr,
						status: {
							status: res.status,
							message: res.message ? res.message : res.error,
						},
					}));
				}
			});
		this.getEmployees();
	};

	render() {
		return (
			<div>
				<div className="py-2 px-5 d-flex justify-content-center">
					{this.state.status.message ? (
						this.state.status.status === true ? (
							<div
								className="alert alert-success d-flex align-items-center p-1 px-5 m-0 w-25"
								role="alert"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-check-lg"
									viewBox="0 0 16 16"
								>
									<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
								</svg>
								<div className="ms-1">{this.state.status.message}</div>
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
									class="bi bi-exclamation-triangle"
									viewBox="0 0 16 16"
								>
									<path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
									<path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
								</svg>
								<div className="ms-2">{this.state.status.message}</div>
							</div>
						)
					) : (
						""
					)}
				</div>
				<div className="p-4 px-5">
					<div>
						<div className="row text-center">
							<h1>Employee List</h1>
						</div>
					</div>
					<div className="ms-auto">
						<NavLink className={"btn btn-primary"} to="/emp/edit?mode=true">
							Add new Employee
						</NavLink>
					</div>
					<div className="p-0 m-3 rounded-4 bg-white border">
						<table className="table table-striped mb-0">
							<thead>
								<tr>
									<th className="ps-4">#</th>
									<th scope="col">Employee First Name</th>
									<th scope="col">Employee Last Name</th>
									<th scope="col">Employee Email id</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{this.state.employees ? (
									this.state.employees.map((employee, index) => (
										<tr key={index}>
											<th key={index} scope="row" className="ps-4">
												{index}
											</th>
											<td>{employee.first_name}</td>
											<td>{employee.last_name}</td>
											<td>{employee.email}</td>
											<td className="px-2 py-1 col-3">
												<NavLink
													className="btn btn-primary"
													to={"/emp/view?id=" + employee._id}
												>
													View
												</NavLink>
												<NavLink
													className="btn btn-secondary ms-3"
													to={"/emp/edit?mode=false&eid=" + employee._id}
												>
													Edit
												</NavLink>
												<button
													className="btn btn-danger ms-3"
													key={employee._id}
													onClick={(e) =>
														this.onDeleteEmployee(e, employee._id)
													}
												>
													Delete
												</button>
											</td>
										</tr>
									))
								) : (
									<div></div>
								)}
							</tbody>
						</table>
					</div>

					<Modal show={this.state.viewEmp} onHide={this.handleViewClose}>
						<Modal.Header closeButton>
							<Modal.Title>{this.state.viewForm.title}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className="container">
								<div className="row">
									<div className="col-md-6">Employee First Name</div>
									<div className="col-tatd-6">
										<h4>{this.state.viewForm.data.fname}</h4>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">Employee Last Name</div>
									<div className="col-md-6">
										<h4>{this.state.viewForm.data.lname}</h4>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">Employee Email ID</div>
									<div className="col-md-6">
										<h4>{this.state.viewForm.data.email}</h4>
									</div>
								</div>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="primary" onClick={this.handleViewClose}>
								Save Changes
							</Button>
							<Button variant="secondary" onClick={this.handleViewClose}>
								Discard
							</Button>
						</Modal.Footer>
					</Modal>

					{/* Edit Modal */}
					<Modal show={this.state.editEmp} onHide={this.handleViewClose}>
						<Modal.Header closeButton onClick={this.handleEditClose}>
							<Modal.Title className="text-center">
								{this.state.editForm.title}
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<form>
								<div className="form-floating mb-3">
									<input
										type="text"
										className="form-control"
										id="emp_fname"
										placeholder="John"
										value={this.state.editForm.data.fname}
										onChange={(e) => this.onValueChanged(e)}
									/>
									<label htmlFor="emp_fname">First Name</label>
								</div>
								<div className="form-floating mb-3">
									<input
										type="text"
										className="form-control"
										id="emp_lname"
										value={this.state.editForm.data.lname}
										onChange={(e) => this.onValueChanged(e)}
										placeholder="Doe"
									/>
									<label htmlFor="emp_lname">First Name</label>
								</div>
								<div className="form-floating">
									<input
										type="text"
										className="form-control"
										id="emp_email"
										value={this.state.editForm.data.email}
										onChange={(e) => this.onValueChanged(e)}
										placeholder="name@example.com"
									/>
									<label htmlFor="emp_email">Email address</label>
								</div>
							</form>
						</Modal.Body>
						<Modal.Footer className="d-flex justify-content-center">
							<Button variant="primary" onClick={this.handleEditClose}>
								Save Changes
							</Button>
							<Button variant="secondary" onClick={this.handleEditClose}>
								Discard
							</Button>
						</Modal.Footer>
					</Modal>

					<Button
						variant="primary"
						onClick={() => {
							console.log(this.state);
						}}
					>
						Show state
					</Button>
				</div>
			</div>
		);
	}
}
export default Employee;
