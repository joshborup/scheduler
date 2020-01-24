const axios = require("axios");
const User = require("../collections/user");
module.exports = {
	login: async (req, res) => {
		var payLoad = {
			client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
			client_secret: process.env.AUTH0_CLIENT_SECRET,
			code: req.query.code,
			grant_type: "authorization_code",
			redirect_uri: `http://localhost:3000/auth/callback`
		};

		const accessTokenResponse = await axios.post(
			`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
			payLoad
		);

		const accessToken = accessTokenResponse.data.access_token;
		const { data: userInfo } = await axios.get(
			`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${accessToken}`
		);
		const [registerUser] = await User.find({ email: userInfo.email });
		if (!registerUser) {
			const user = new User({
				name:
					userInfo.name ||
					userInfo.given_name + " " + userInfo.family_name ||
					userInfo.nickname,
				email: userInfo.email
			});
			user.save(async (err) => {
				console.log("newUser");
				if (err) {
					console.log(err);
				} else {
					const [newUser] = await User.find({
						email: userInfo.email
					});
					newUser.newUser = true;
					req.session.user = newUser;
					res.redirect("/");
				}
			});
		} else {
			console.log("returnUser");
			registerUser.newUser = false;
			req.session.user = registerUser;
			res.redirect("/");
		}
	},
	logout: (req, res, next) => {
		req.session.destroy();
		res.sendStatus(200).end();
	},
	sessionCheck: async (req, res, next) => {
		if (req.session.user) {
			const [registerUser] = await User.find({
				email: req.session.user.email
			});
			req.session.user = registerUser;
			res.status(200).send(req.session.user);
		} else {
			res.end();
		}
	}
};
