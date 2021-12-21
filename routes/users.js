const express = require("express");
const router = express.Router();
const fs = require("fs");
const User = require('../models/user')

const users = require("../users.json");

router.get("/all", async (req, res) => {

  User.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})


router.get("/", async (req, res) => {
  const re = new RegExp(`${req.query.name}`, "i");
  // const user = await User.find({ name: re }).exec();
  const user = await User.find({ $or: [{ name: re }, { username: re }] }).exec();

  res.send(user);

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

router.post("/", (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email
  })

  user.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router;
