const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	phone: {
		type: String,
		required: true,
		unique: true
	},
	date_joined: {
		type: Date,
		default: Date().toLocaleString()
	}
});

const appoinmentSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	email: {
		type: String
	},
	start: {
		type: Date,
		required: true
	},
	end: {
		type: Date,
		required: true
	},
	allDay: {
		type: Boolean,
		required: true
	}
});

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	company: {
		type: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "company",
			unique: true
		}
	},
	customers: [customerSchema],
	appointments: [appoinmentSchema]
});

module.exports = mongoose.model("user", userSchema);
