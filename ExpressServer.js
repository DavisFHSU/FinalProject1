const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3000;

// Custom Middleware Function
app.use(logger);

app.use(cors(corsOptions));

// Built in middleware functions in express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
// API Route
app.use("/employees", require("./routes/api/employees"));

// Handel un-defined routes
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
// Error Logger
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
