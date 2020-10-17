const db = require("../models");

// Routes

module.exports = function (app) {
  // Each of the below routes just handles the HTML pages

  // index route loads login page
  app.get("/", function (req, res) {
    res.render("login");
  });
  // signup route loads signup page
  app.get("/signup", function (req, res) {
    res.render("signup");
  });
  // index route loads login page
  app.get("/logout", function (req, res) {
    res.render("login");
  });
  // index route loads received gifts page
  app.get("/received", function (req, res) {
    userId = 1
    db.ReceivedGifts.findAll({
      where: {
        user_id: userId,
    },
      order: [
        ["id", "DESC"]
      ]
    })
      .then((allReceivedGifts) => {
        res.render("receivedGifts", { gifts: allReceivedGifts });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to get received gifts.",
        });
      });
  });
  // index route loads sent gifts page
  app.get("/sent", function (req, res) {
    userId = 1
    db.SentGifts.findAll({
      where: {
        user_id: userId,
    },
      order: [
        ["id", "DESC"]
      ]
    })
      .then((allSentGifts) => {
        // res.json(allSentGifts);
        res.render("sentGifts", {gifts: allSentGifts});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to get sent gifts.",
        });
      });
  });
  //received gift function to order by
  const orderReceived = (col, direction, res)=>{
    db.ReceivedGifts.findAll({
      where: {
        user_id: userId,
    },
      order: [
        [col, direction]
      ]
    })
      .then((allReceivedGifts) => {
        res.render("receivedGifts", { gifts: allReceivedGifts });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to get received gifts.",
        });
      });
  }
  //sent gift function to order by
  const orderSent = (col, direction, res)=>{
    db.SentGifts.findAll({
      where: {
        user_id: userId,
    },
      order: [
        [col, direction]
      ]
    })
      .then((allSentGifts) => {
        res.render("sentGifts", { gifts: allSentGifts });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to get sent gifts.",
        });
      });
  }
  app.get("/received/date", function (req, res) {
    userId = 1
    orderReceived("dateReceived", "DESC", res)
  });
  // route loads sent gifts page ordered by date
  app.get("/sent/date", function (req, res) {
    userId = 1
    db.SentGifts.findAll({
      where: {
        user_id: userId,
    },
      order: [
        ["dateSent", "DESC"]
      ]
    })
      .then((allSentGifts) => {
        // res.json(allSentGifts);
        res.render("sentGifts", {gifts: allSentGifts});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to get sent gifts.",
        });
      });
  });
  // index route loads add received gifts page
  app.get("/add/received", function (req, res) {
    res.render("addReceived");
  });
  // index route loads add sent gifts page
  app.get("/add/sent", function (req, res) {
    res.render("addSent");
  });
};
