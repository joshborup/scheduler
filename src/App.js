import React from "react";
import authHook from "./hooks/authHook";
import Header from "./components/shared/Header";
import { Switch, Route } from "react-router-dom";
import CustomerContainer from "./components/customers/CustomerContainer";
import CalendarContainer from "./components/calendar/CalendarContainer";
import "./App.scss";

function App() {
	const { user, login, logout } = authHook();
	return (
		<div className="App">
			<Header user={user} login={login} logout={logout} />
			<Switch>
				<Route
					exact
					path="/"
					render={() => {
						return <div>Home</div>;
					}}
				/>
				{user && (
					<>
						<Route
							path="/customers"
							component={CustomerContainer}
						/>
						<Route path="/calendar" component={CalendarContainer} />
					</>
				)}
			</Switch>
		</div>
	);
}

export default App;
