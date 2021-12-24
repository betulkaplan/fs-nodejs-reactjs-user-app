const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/all", async (req, res) => {

    Product.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})


router.post("/", (req, res) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image,
        others: req.body.others
    })

    product.save()
        .then((result) => {
            res.send("Product Added Succesfully!");
        })
        .catch((err) => {
            res.send(err);
        })

})

module.exports = router;