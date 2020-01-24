import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomerForm from "./CustomerForm";

export default function CustomerContainer() {
	const user = useSelector((state) => state.user);
	const [search, setSearch] = useState("");
	console.log(user);
	const mappedCustomers =
		user &&
		user.customers
			.filter((customer) =>
				customer.name.toLowerCase().includes(search.toLowerCase())
			)
			.map((customer) => {
				return (
					<div className="customer" key={customer._id}>
						<div>{customer.name}</div>
						<div>{customer.phone}</div>
					</div>
				);
			});
	return (
		<div className="customer-container">
			<div>
				<div>
					<h1>Add Customer</h1>
					<CustomerForm />
				</div>
				<div className="customer-list">
					<h1>Customers</h1>
					<div>
						<label htmlFor="name">Name Search:</label>
						<input
							placeholder="Ex. John Doe"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<div>{mappedCustomers}</div>
				</div>
			</div>
		</div>
	);
}
