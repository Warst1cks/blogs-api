require("dotenv").config();

const app = require("./app");
const dbConnect = require("./config/db")
dbConnect();

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT,HOST,() => {
console.log('server listenining on port 8000')
})