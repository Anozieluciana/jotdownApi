const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./utils/db");
const route = require("./router/diaryRouter")

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({ message: "This is best place to be" });
});

app.use("/api",require("./router/userRouter"))
app.use("/api/user", route)

app.listen(port, () => {
	console.log("server is now running...!");
});
