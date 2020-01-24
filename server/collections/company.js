const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	employees: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "user",
				unique: true
			}
		]
	},
	hoursOfOperation: {
		type: String
	}
});

module.exports = mongoose.model("company", userSchema);
