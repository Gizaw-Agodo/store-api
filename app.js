require('dotenv').config()
const express = require('express')
const app = express()
const connectToDb = require('./db/connect')
const store = require('./routes/store_routes')
const main = require('./routes/main')
//middleware
app.use(express.json())

//routes
app.use("/api/v1/products",store)
app.use('/api/v1',main)


//db connection
port  =process.env.port||3000
const start = async()=>{
    try {
      connectToDb(process.env.storeConnection);
      app.listen(port,console.log(`app starts listning on port ${port}...`));
      
    } catch (error) {
       console.log(error)
      
    }
   
}
start()




// const express = require("express");
// const app = express();
// const connectToDb = require("./db/connect");
// require("dotenv").config();
// const tasks = require("./routes/tasks_route");

// //middleware
// app.use(express.json());
// app.use("/api/v1/tasks", tasks);

// app.use((req,res)=>{
//   res.send('route not found ')
 




// const port = 3000;
// const start = async () => {
//   try {
//     await connectToDb(process.env.connectionString);
//     app.listen(port, console.log(`app is listening on port ${port}...`));
//   } catch (err) {
//     console.log(err);
//   }
// };
// start();


