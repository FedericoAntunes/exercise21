require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const passport = require("./passport/passportConfig");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

passport(app);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

routes(app);

//dbInitialSetup(); // Create the tables and insert the data from the seeder, if you want to keep your data in the tables comment this line.

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
