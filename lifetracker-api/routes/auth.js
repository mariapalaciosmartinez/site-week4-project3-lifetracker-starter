"use strict"

const express = require("express")
const User = require("../models/user")
const router = express.Router()

const jwt = require("jsonwebtoken");
const { dbKey } = require("../config")

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.authenticate(req.body)
    //upon successful login, create a token
    const token = jwt.sign({ userId: user.id, userName: user.name }, dbKey,
      {expiresIn: "1h",}
      );
      console.log(token);

    return res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
})

router.post("/register", async function (req, res, next) {
  try {
    console.log('body below')
    console.log(req.body)
    const user = await User.register(req.body)
    return res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
})

module.exports = router
