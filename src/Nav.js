export default function Nav(props) {
	return (
		<nav className="navbar navbar-expand-md navbar-light bg-light shadow">
			<div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
				<ul className="ms-1 navbar-nav me-auto">
					{props.lefts
						? props.lefts.map((left, index) => (
								<li key={index} className="nav-item">
									<a className="nav-link" href={left.url ? left.url : "#"}>
										{left.title}
									</a>
								</li>
						  ))
						: ""}
				</ul>
			</div>
			<div className="mx-auto order-0">
				<h3 className="navbar-brand mx-auto">{props.page}</h3>
			</div>
			<div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
				<ul className="navbar-nav ms-auto">
					{props.rights
						? props.rights.map((right, index) => (
								<li key={index} className="nav-item">
									<a className="nav-link" href={right.url ? right.url : "#"}>
										{right.title}
									</a>
								</li>
						  ))
						: ""}
				</ul>
			</div>
		</nav>
	);
}
