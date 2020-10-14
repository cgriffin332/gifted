const path = require("path");

// Routes

module.exports = function(app) {

  // Each of the below routes just handles the HTML pages

  // index route loads login page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/login.handlebars"));
  });

};