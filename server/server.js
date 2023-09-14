const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
app.use(cors());
const userRoute = require("./routes/userRoute");
const songsRoute = require("./routes/songsRoute");
const adminRoute = require("./routes/adminRoute");

app.use("/api/users", userRoute);
app.use("/api/songs", songsRoute);
app.use("/api/admin", adminRoute);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started at port  ${PORT}`));
