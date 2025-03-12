//imports and connects
const express=require("express");
const cors=require("cors");
const mongoConnect= require ( "./db.js");
const app = express();
app.use(cors());
app.use(express.json());
mongoConnect();
const port = 4000;



//Avialable Routes
app.use("/api/auth",require('./Routes/auth'));
app.use("/api/notes",require('./Routes/notes'));


//Server Listening on a port
app.listen(port, () => {
  console.log(`Server App listening on port ${port}`);
});


