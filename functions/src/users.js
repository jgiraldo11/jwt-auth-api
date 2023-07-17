import jwt from "jsonwebtoken"
import { ObjectID } from "mongodb"
import { db } from "./dbConnect.js"
import { secret } from "../creds.js"

const coll = db.collection('users')

export async function signup(req, res) {
  const { email, password } = req.body
  // TODO: hash passwords - this is called technical debt. 
  await coll.insertOne({ email: email.toLowerCase(), password }) // bad to store password in plain text, but we'll deal with this later. 
// Note: not checking if email already exists or doing any validation.
login(req, res)
}

export async function login(req, res) {
  const { email, password } = req.body
  let user = await coll.findOne({ email: email.toLowerCase(), password })
  delete user.password // strip out password
  const token = jwt.sign(user, secret)
  res.send ({ user, token }) 
}

// TODO: getProfile
export async function getProfile(req, res) {
  // make sure the user has sent an auth token (JWT)
  if(!req.headers || !req.headers.authorization) {
    res.staus(401).send({ message: "Not authorized"})
    return
  }
  const decoded = jwt.verify(req.headers.authorization, secret)
  const user = await coll.findOne({ "_id": new ObjectID(decoded._id) })
  res.send({ user })

}

// TODO: editProfile