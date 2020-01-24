import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const AppointmentCalendar = ({ appointments }) => {
	console.log(appointments);
	const betterDates = appointments.map((appointment) => {
		appointment.start = new Date(appointment.start);
		appointment.end = new Date(appointment.end);
		return appointment;
	});
	return (
		<Calendar
			localizer={localizer}
			startAccessor="start"
			endAccessor="end"
			onSelectEvent={(event) => {
				console.log("select event", event);
			}}
			// getDrilldownView={(
			// 	targetDate,
			// 	currentViewName,
			// 	configuredViewNames
			// ) => {
			// 	// if (
			// 	// 	currentViewName === "month" &&
			// 	// 	configuredViewNames.includes("week")
			// 	// ) {
			// 	// 	return "week";
			// 	// }
			// 	// return null;
			// 	console.log(currentViewName, configuredViewNames);
			// }}
			onSelectSlot={(event) => {
				console.log(event);
			}}
			selectable={true}
			style={{ height: 500 }}
			events={betterDates}
		/>
	);
};

export default AppointmentCalendar;
