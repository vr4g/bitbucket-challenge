const express = require("express");
const router = require("./routes/routes");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});

app.use("/", router);
