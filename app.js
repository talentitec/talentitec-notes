require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectionDB = require("./src/db/connection");
const routes = require('./routes');
const corsOptions = { origin: '*' };

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

connectionDB();

app.listen(process.env.PORT, function() {
    console.log("############################")
    console.log("#                          #")
    console.log("#     Servidor Online!     #")
    console.log("#                          #")
    console.log("############################")
});
