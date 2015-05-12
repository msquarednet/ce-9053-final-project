var express = require("express");
var bodyParser = require("body-parser");
var db = require("./config/db");
var staticRoutes = require("./routes/static_routes");
var sessionsRouter = require("./routes/sessions_router");
var peopleRouter = require("./routes/people_router");
var thingsRouter = require("./routes/things_router");

db.connect(process.env.CONN, function(){
  console.log("Connected to DB."); 
});

var app = express();
app.locals.pretty = true;
app.set("view engine", "jade");
app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

var paths = ["/", "/people/:id?", "/things?", "/things/edit/:_id?", "/login"];
staticRoutes.setUp(paths, app);

app.use("/api/sessions", sessionsRouter);
app.use("/api/people", peopleRouter);
app.use("/api/things", thingsRouter);

app.listen(process.env.PORT);



//    "start": "JWT_SECRET=bar CONN=mongodb://localhost/my_world nodemon server.js"