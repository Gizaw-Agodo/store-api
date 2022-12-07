const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.route("/login").post((req, res) => {
  const { password, username } = req.body;
  if (!password || !username) {
    res.status(400).json({ msg: "Please provide username and password " });
  }
  const id = new Date().getDate();
  const saltString = process.env.salt_string;
  const token = jwt.sign({ username, id }, saltString, { expiresIn: "30d" });
  res.status(200).json({ token: token });
});


router.route("/dashboard").get((req, res) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader){
    return res.status(401).json({ msg: "token not provided" });
  }
  try {
    token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.salt_string);
    res.status(200).json(decoded);
  } catch (error) {
    res.status(401).json({"error":"error"});
  }

  res.send("sucessfull dashboard");
  console.log(req.headers.authorization);
});



module.exports = router;
