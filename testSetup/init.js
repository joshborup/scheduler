const mongoose = require("mongoose");
require("dotenv").config();
let connection;

module.exports = {
	initDb: () => {
		connection =
			connection ||
			mongoose.connect(process.env.CONNECTION_STRING_TEST, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true
			});

		return connection;
	}
};
