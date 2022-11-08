const mongoose = require("mongoose");

module.exports = function (){
const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
mongoose.connect(MONGODB_CONNECTION_URL);
mongoose.connection.on("connected", async () => {
    console.log('connected to db successfully')
})
mongoose.connection.on("error", (err) => {
  console.log("an error occured",err);
});

}
