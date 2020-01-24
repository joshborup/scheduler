import React, { useState } from "react";
import AppointmentCalendar from "./AppointmentCalendar";
import authHook from "../../hooks/authHook";
import AppointmentForm from "./AppointmentForm";
import PopUp from "../shared/PopUp";
import moment from "moment";
import DatePicker from "react-datepicker";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/src/stylesheets/datepicker.scss";

export default function CalendarContainer() {
	const [selectedUser, setSelectedUser] = useState(null);

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
			{selectedUser && (
				<PopUp close={() => setSelectedUser(null)}>
					<SelectedUser selectedUser={selectedUser} />
				</PopUp>
			)}
			<AppointmentCalendar
				setSelectedUser={setSelectedUser}
				appointments={user.appointments}
			/>
		</div>
	);
}

function SelectedUser({ selectedUser }) {
	const [date, setDate] = useState(Date.now());
	return (
		<div className="selected-user-container">
			<h2>Appointment - {selectedUser.title}</h2>
			<div className="title-date">
				<div>Current</div>
				{/* <div>{new Date(selectedUser.start).toLocaleDateString()}</div> */}
				<div>{moment(selectedUser.start).format("ll")}</div>
				<div>
					<span>{moment(selectedUser.start).format("LT")}</span>
					<span> - </span>
					<span>{moment(selectedUser.end).format("LT")}</span>
				</div>
			</div>
			<Formik
				initialValues={{
					name: selectedUser.title,
					apptLength: 0
				}}
				validationSchema={Yup.object({
					name: Yup.string().required("Required"),
					apptLength: Yup.number().required("Required")
				})}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					console.log(values);

					resetForm();
				}}>
				<Form className="customer-form column">
					<div className="appointment-field">
						<label>Appointment Time</label>
						<DatePicker
							selected={date}
							onChange={(date) => setDate(date)}
							showTimeSelect
							timeFormat="HH:mm"
							timeIntervals={15}
							timeCaption="time"
							// use this for setting availability
							// minTime={new Date()}
							// maxTime={
							// 	new Date(new Date().getTime() + 240 * 60000)
							// }
							dateFormat="MMMM d, yyyy h:mm aa"
							className="date-picker"
						/>
					</div>
					<div className="appointment-field">
						<label>Appointment Length</label>
						<Field
							name="apptLength"
							component="select"
							placeholder="Appointment Length">
							<option value={null} defaultChecked>
								None Chosen
							</option>

							<option value={30}>30 Minute</option>
							<option value={45}>45 Minute</option>
							<option value={60}>1 hours</option>
							<option value={75}>1 hour 15 Minutes</option>
							<option value={90}>1 hour 30 Minutes</option>
							<option value={105}>1 hour 45 Minutes</option>
							<option value={120}>2 hours</option>
							<option value={0}>Cancel</option>
						</Field>
						<ErrorMessage name="length" />
					</div>
					<div className="appointment-field">
						<button type="submit">Submit</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
}

/* <Formik
	initialValues={{
		name: "",
		apptLength: 0
	}}
	validationSchema={Yup.object({
		name: Yup.string().required("Required"),
		apptLength: Yup.number().required("Required")
	})}
	onSubmit={(values, { setSubmitting, resetForm }) => {
		console.log(
			values.name,
			date,
			new Date(date.getTime() + +values.apptLength * 60000)
		);

		addAppointment(
			values.name,
			date,
			new Date(date.getTime() + +values.apptLength * 60000),
			setSubmitting
		);
		resetForm();
	}}>
	<Form className="customer-form">
		<div className="appointment-field">
			<label>Appointment Time</label>
			<DatePicker
				selected={date}
				onChange={(date) => setDate(date)}
				showTimeSelect
				timeFormat="HH:mm"
				timeIntervals={15}
				timeCaption="time"
				// use this for setting availability
				// minTime={new Date()}
				// maxTime={
				// 	new Date(new Date().getTime() + 240 * 60000)
				// }
				dateFormat="MMMM d, yyyy h:mm aa"
				className="date-picker"
			/>
		</div>
		<div className="appointment-field">
			<label>Choose Customer</label>
			<Field name="name" component="select" placeholder="Customer name">
				<option value={null} defaultChecked>
					None Chosen
				</option>
				{customerOptions}
			</Field>
			<ErrorMessage name="name" />
		</div>

		<div className="appointment-field">
			<label>Appointment Length</label>
			<Field
				name="apptLength"
				component="select"
				placeholder="Appointment Length">
				<option value={null} defaultChecked>
					None Chosen
				</option>

				<option value={30}>30 Minute</option>
				<option value={45}>45 Minute</option>
				<option value={60}>1 hours</option>
				<option value={75}>1 hour 15 Minutes</option>
				<option value={90}>1 hour 30 Minutes</option>
				<option value={105}>1 hour 45 Minutes</option>
				<option value={120}>2 hours</option>
			</Field>
			<ErrorMessage name="length" />
		</div>
		<div className="appointment-field">
			<button type="submit">Submit</button>
		</div>
	</Form>
</Formik>; */
