import { db } from "./dbConnect.js"

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
  // TODO: create token and send with user below
  res.send ({ user }) 
}