const app = require("./src/app");
require("dotenv").config();
const connectDB = require("./src/Database/db");

connectDB();
app.listen(3000,(req,res) =>{
    console.log("server is running on portNumber 3000");
})