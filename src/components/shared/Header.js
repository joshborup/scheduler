import React from "react";
import { NavLink } from "react-router-dom";
export default function Header({ user, login, logout }) {
	return (
		<header className="main-header">
			<div>
				<NavLink activeClassName="active-nav-class" exact to="/">
					Home
				</NavLink>
				{user && (
					<>
						<NavLink
							activeClassName="active-nav-class"
							to="/customers">
							Customers
						</NavLink>
						<NavLink
							activeClassName="active-nav-class"
							to="/calendar">
							Calendar
						</NavLink>
					</>
				)}
				<button
					onClick={() => {
						if (!user) {
							login();
						} else {
							logout();
						}
					}}>
					{!user ? "Login" : "Logout"}
				</button>
			</div>
		</header>
	);
}
