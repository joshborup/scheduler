import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { SET_USER } from "../../redux/reducer";
import axios from "axios";
import * as Yup from "yup";

const CustomerForm = () => {
	const dispatch = useDispatch();
	function addCustomer(values, setSubmitting) {
		axios.post("/api/customer/add_customer", values).then((user) => {
			console.log(user);
			dispatch({ type: SET_USER, payload: user.data });
			setSubmitting(false);
		});
	}

	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	return (
		<Formik
			initialValues={{ name: "", email: "", phone: "" }}
			validationSchema={Yup.object({
				name: Yup.string().required("Required"),
				phone: Yup.string()
					.matches(phoneRegExp, "Phone number is not valid")
					.required("Required"),
				email: Yup.string()
					.email("Invalid email address")
					.required("Required")
			})}
			onSubmit={(values, { setSubmitting, resetForm }) => {
				addCustomer(values, setSubmitting);
				resetForm();
			}}>
			<Form className="customer-form">
				<div>
					<label htmlFor="name">Name:</label>
					<Field placeholder="Ex: John Doe" name="name" type="text" />
					<ErrorMessage name="name" />
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<Field
						placeholder="Ex: johndoe@example.com"
						name="email"
						type="email"
					/>
					<ErrorMessage name="email" />
				</div>
				<div>
					<label htmlFor="phone">Phone:</label>
					<Field
						placeholder="Ex: 555 555 5555"
						name="phone"
						type="tel"
					/>
					<ErrorMessage name="phone" />
				</div>
				<button type="submit">Submit</button>
			</Form>
		</Formik>
	);
};

export default CustomerForm;
