const express = require("express");
const router = express.Router();
const Product = require("../models/product_model");

router
  .route("/")

  //get all products
  .get(async (req, res) => {
    const { sort, fields,limit,page,...queryObject } = req.query;
    try {
      const result = await Product
        .find(queryObject)
        .sort(sort ? sort.split(",").join(" ") : "createdAt")
        .select(fields && fields.split(",").join(" "))
        .skip( ((Number(page) || 1) - 1) * (Number(limit) || 10))
        .limit(Number(limit) || 10);

      res.status(200).json({ result });
    } catch (error) {
      res.status(401).json(error);
    }
  });

//create a product

module.exports = router;
