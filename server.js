const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes"));

mongoose.connect("mongodb://localhost/noSQL-sns", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.set("debug", true);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
