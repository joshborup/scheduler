const User = require("../collections/user");
module.exports = {
	async addAppointment(req, res, next) {
		const { title, name, start, end } = req.body;

		const user = await User.findById(req.session.user._id);

		user.appointments.push({ title, name, start, end, allDay: false });
		user.save((err) => {
			if (err) {
				res.status(500).send("there was an error");
			} else {
				req.session.user = user;
				res.status(200).send(req.session.user);
			}
		});
	},
	async addCustomer(req, res, next) {
		const { name, email, phone } = req.body;

		const user = await User.findById(req.session.user._id);
		console.log("user", user);
		user.customers.push({ name, email, phone });
		user.save((err) => {
			if (err) {
				console.log(err);
				res.status(500).send("there was an error");
			} else {
				req.session.user = user;
				res.status(200).send(req.session.user);
			}
		});
	}
};
