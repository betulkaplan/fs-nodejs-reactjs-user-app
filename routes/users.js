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
    console.log("writing to  users");
  });
  res.send({
    message: "User Deleted Succesfully!",
  });
});

router.get("/:id", (req, res) => {
  const user = users.filter(function (user, index, arr) {
    return user.id === parseInt(req.params.id);
  });
  res.send(user);
});

router.put("/:id", (req, res) => {
  console.log('id------', req.params.id)
  // console.log(req.body)

  let filtered = users.filter(function (user, index, arr) {
    return user.id != req.params.id;
  });
  console.log([...filtered, req.body])

  fs.writeFile("users.json", JSON.stringify([...filtered, req.body]), function writeJSON(err) {
    if (err) return console.log(err);
    console.log("writing to users");
  });
  res.send({
    message: "User Updated Succesfully!",
  });

});

module.exports = router;
