"use strict"

const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")
const jwt = require('jsonwebtoken')
 const { dbKey } = require("../config")


const { BCRYPT_WORK_FACTOR } = require("../config")

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {User} user - user from database
   * @returns public user
   */
  static _createPublicUser(user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.email,
    }
  }

  /**
   * Authenticate user with email and password.
   *
   * Throws UnauthorizedError if user not found or wrong password.
   *
   * @returns user
   **/

  static async authenticate(creds) {
    const { email, password } = creds
    const requiredCreds = ["email", "password"]
    try {
      validateFields({ required: requiredCreds, obj: creds, location: "user authentication" })
    } catch (err) {
      throw err
    }

    const user = await User.fetchUserByEmail(email)

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password)
      if (isValid === true) {
        return User._createPublicUser(user)
      }
    }

    throw new UnauthorizedError("Invalid username/password")
  }

  /**
   * Register user with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns user
   **/

  static async register(creds) {
    const { email, password, firstName, lastName, username } = creds
    const requiredCreds = ["email", "password", "firstName", "lastName", "username"]
    try {
      validateFields({ required: requiredCreds, obj: creds })
    } catch (err) {
      throw err
    }
  
    const existingUserWithEmail = await User.fetchUserByEmail(email)
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`)
    }
  
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = email.toLowerCase()
  
    const result = await db.query(
      `INSERT INTO users (
          password,
          first_name,
          last_name,
          email,
          username
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id,
                  email,            
                  first_name AS "firstName", 
                  last_name AS "lastName",
                  username
        `,
      [hashedPassword, firstName, lastName, normalizedEmail, username]
    )
  
    const user = result.rows[0]
  
    return user
  }  

  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns user
   */
  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT id,
              email, 
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              username
           FROM users
           WHERE email = $1`,
      [email.toLowerCase()]
    )

    const user = result.rows[0]

    return user
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} userId
   * @returns user
   */
  static async fetchById(userId) {
    const result = await db.query(
      `SELECT id,
              email,    
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              username
           FROM users
           WHERE id = $1`,
      [userId]
    )

    const user = result.rows[0]

    return user
  }

  /**
   * upon successful login, create a token
   * 
   * @param {*} user 
   * @returns 
   */
  static generateAuthToken(user) {
    let payload = {user
    }
    let token = jwt.sign(payload, dbKey, { expiresIn: '30d' })
    return token
}

/**
 * verifies there was a successful login
 * 
 * @param {*} token 
 * @returns 
 */
static verifyToken(token) {
    if (typeof token !== 'string')
        return {error: `token not a string, its a ${typeof token}`}
    let verified = jwt.verify(token, dbKey)
    if (verified) {
        let decoded = jwt.decode(token)
        return decoded
    }
    else {
        return { error: 'invalid token' }
    }
}
}

module.exports = User