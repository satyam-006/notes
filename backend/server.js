/**
 * server ko call karne
 * database se connect krna
 */
require("dotenv").config()
const app = require("./src/app");
const connectToDb = require("./src/config/database")

connectToDb()

app.listen(3000, () => {
  console.log("server is runnnig on port 3000");
});
