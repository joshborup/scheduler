import React from "react";
import AppointmentCalendar from "./AppointmentCalendar";
import authHook from "../../hooks/authHook";
import AppointmentForm from "./AppointmentForm";

const CalendarContainer = () => {
	const { user, addAppointment } = authHook();
	const customerOptions = user.customers.map((customer) => {
		return <option value={customer.name}>{customer.name}</option>;
	});

	return (
		<div className="calendar-container">
			<AppointmentForm
				customerOptions={customerOptions}
				addAppointment={addAppointment}
			/>
			<div>selected user</div>
			<AppointmentCalendar appointments={user.appointments} />
		</div>
	);
};

export default CalendarContainer;
