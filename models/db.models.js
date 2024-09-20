const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(()=> {
  console.log("DB connection established");
})
.catch((error)=> {
  console.error("Failed to connect to DB");
});