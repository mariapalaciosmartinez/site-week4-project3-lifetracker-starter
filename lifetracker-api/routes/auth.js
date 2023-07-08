"use strict"

const express = require("express")
const User = require("../models/user")
const exercise = require("../models/exercise")
const router = express.Router()
const jwt = require("jsonwebtoken")

// const jwt = require("jsonwebtoken");
// const { dbKey } = require("../config")

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.authenticate(req.body)
    //upon successful login, create a token
    // const token = jwt.sign({ userId: user.id, userName: user.name }, dbKey,
    //   {expiresIn: "1h",}
    //   );
    //   console.log(token);
    //delete this comment^
    
    // send auth token + user data
    let token = User.generateAuthToken(user)
    res.send({token})
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

router.post("/ActivityPage", async (req, res) => {
  let token = req.body.token;
  console.log(req.body.token)
  if (token) {
      let userInfo = User.verifyToken(token)
      res.send(userInfo)
  }
  else {
      res.send({ error: 'no token received'})
  }
})

router.get("/exercise/:user_id",  async function (req, res, next) {
  console.log("req.params is: ", req.params.user_id)
  try {
    const exercises = await exercise.fetchExercisesByUserId(req.params.user_id);
    return res.status(200).json({ exercises });
  } catch (err) {
    next(err);
  }
});

// router.post("/exercise/create", async function (req, res, next) {
//   try {
//     const exercise = await exercise.create(req.body);
//     return res.status(201).json({ exercise });
//   } catch (err) {
//     next(err);
//   }
// });
router.post("/exercise/create", async function (req, res, next) {
  try {
    console.log("we got this far")
    const createdExercise = await exercise.create(req.body);
    return res.status(201).json({ exercise: createdExercise });
  } catch (err) {
    next(err);
  }
});

module.exports = router
