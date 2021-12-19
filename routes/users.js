const express = require("express");
const router = express.Router();
const fs = require("fs");

const users = require("../users.json");

router.get("/", (req, res) => {
  if (req.query.name) {
    const name = users?.filter((name) =>
      name.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
    if (name) {
      res.send(name);
    } else {
      res.send({ error: "Name not found" });
    }
  } else {
    res.send({ error: "Please provide a name!" });
  }

  // res.send(users);
});

router.delete("/", (req, res) => {
  var filtered = users.filter(function (user, index, arr) {
    return user.id != req.query.id;
  });

  fs.writeFile("users.json", JSON.stringify(filtered), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(filtered));
    console.log("writing to  users");
  });
  res.send({ message: "User Deleted Succesfully!" });
});
module.exports = router;
