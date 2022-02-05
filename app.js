const fileUpload = require("express-fileupload");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models/index");
const path = require("path");
const dbConfig = require("./config/db.config");
const cookieParser = require("cookie-parser");
const { body, validationResult } = require("express-validator");
const app = express();

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json()); // tou lew oti ta  arxeia mou tha einai json (to body moy tha einai se morfh json)
app.use(fileUpload());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

require("./routes/user.routes")(app);
require("./routes/mainpage.routes")(app);
require("./routes/admin.routes")(app);

const start = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Api up and running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

start(8080);
