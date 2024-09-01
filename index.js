const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const classOneRoute = require("./routes/classOneResult");
const admisssionRoute = require("./routes/admissionRoutes");
const contactRoutes = require("./routes/contact");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const Port = process.env.PORT;
const url = process.env.URL;

app.use("/api/auth", userRoute);
app.use("/one", classOneRoute);
app.use("/api/admissions", admisssionRoute);
app.use("/api", contactRoutes);

mongoose.connect(url).then(console.log("connection successfull"));

app.listen(Port, () => console.log(`server is running at ${Port}`));
