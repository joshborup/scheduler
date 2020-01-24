import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/src/stylesheets/datepicker.scss";
const AppointmentForm = ({ customerOptions, addAppointment }) => {
	const [date, setDate] = useState(Date.now());

	return (
		<div className="appointment-picker">
			<h1>Appointment Calendar</h1>

			<Formik
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
						<Field
							name="name"
							component="select"
							placeholder="Customer name">
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
			</Formik>
		</div>
	);
};

export default AppointmentForm;
