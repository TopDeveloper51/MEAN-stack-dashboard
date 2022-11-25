const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/dashboardServer', require('./controller/controller.ts'));

var port = 9204;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
