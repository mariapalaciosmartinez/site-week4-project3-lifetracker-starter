"use strict"

const PORT = process.env.PORT || 5173

const app = require("./app")
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());

// Import routes
const registrationRoutes = require("./routes/auth");

app.listen(PORT, function () {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})