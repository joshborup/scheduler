require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customer");

app.use(express.json());
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

app.use(
	session({
		secret: SESSION_SECRET,
		resave: true,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 14
		}
	})
);

mongoose
	.connect(CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => {
		console.log("connected");
	});

app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);

const port = SERVER_PORT || 4000;
app.listen(port, () => console.log(`server listening on port ${port}`));
