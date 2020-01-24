const { initDb } = require("../../testSetup/init");
const User = require("../collections/user");
const {
	addCustomer,
	addAppointment
} = require("../controller/customerController");

const userData = {
	name: "test user",
	email: "test@test.com",
	company: null,
	customers: [],
	appointments: []
};

describe("user creation and insertion", () => {
	let db;
	beforeAll(async () => {
		db = await initDb();
	});
	afterEach(async () => {
		await User.deleteMany();
	});
	it("should insert a user", async () => {
		const user = new User(userData);
		const savedUser = await user.save();
		expect(savedUser._id).toBeDefined();
		expect(savedUser.name).toBe(userData.name);
		expect(savedUser.email).toBe(savedUser.email);
	});
});
