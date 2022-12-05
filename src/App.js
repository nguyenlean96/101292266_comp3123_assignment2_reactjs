import "./App.css";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	NavLink,
} from "react-router-dom";
import Employee from "./employees/index";
import EmpView from "./employees/view";
import EmpForm from "./employees/edit";
import Signup from "./uac/signup";
import Login from "./uac/login";
import Nav from "./Nav";
import React from "react";
const log = (whatever) => console.log(whatever);

function App() {
	return (
		<Router>
			<nav className="navbar navbar-expand-md navbar-dark text-white bg-dark shadow">
				<div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2 ms-3"></div>
				<div className="mx-auto order-0">
					<h1 className="navbar-brand mx-auto">{"Employee Management App"}</h1>
				</div>
				<div className="navbar-collapse collapse w-100 order-3 dual-collapse2 me-3">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							{sessionStorage.getItem("user") !== null ? (
								<a
									href="/"
									className="nav-link"
									onClick={(e) => {
										e.preventDefault();
										sessionStorage.removeItem("user");
										window.location.href = "/login";
									}}
								>
									Log out
								</a>
							) : (
								""
							)}
						</li>
					</ul>
				</div>
			</nav>
			<Routes>
				<Route path="/emp" element={<Employee />} />
				<Route path="/emp/edit" element={<EmpForm />} />
				<Route path="/emp/view" element={<EmpView />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</Router>
	);
}

export default App;
