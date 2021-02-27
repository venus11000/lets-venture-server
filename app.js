const express = require("express");
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require('cors');
const path = require('path');
require("dotenv").config();

//  import routes
const jobRoutes = require("./routes/job");

//  app
const app = express();

//  db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected')).catch((error) => console.log(error));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

//  middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressValidator());

//  routes
app.use("/api/jobs/", jobRoutes);

//  static files
app.use('/api/static', express.static(path.join(__dirname, 'static')));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
