import jwt, { TokenExpiredError } from "jsonwebtoken"
import { secret } from "../creds.js"

export async function vailidToken(req, res, next) {
  if(!req.headers || !req.headers.authorization) {
    res.status(401).send({ message: "Not authorized", success: false })
    return
  }
  try{
  const decodedToken = jwt.verify(req.headers.authorization, secret)
  req.decodedToken = decodedToken
  next()
} catch(err) {
  // if we have and invalid token...
  res.status(401).send({ message: "Invalid Auth Token", success: false })
}
}

export async function matchingUser(req, res, next) {
  if(req.decoderToken._id !== req.params.uid) {
    res.status(401).send({ message: "Unautherized request", success: false })
    return
  }
  next()
}

//JUST AN EXAMPLE:
const adminUsers = [
  'todd@bocacode.com',
  'toddalbert@gmail.com',
]

export async function isAdmin(req, res, next) {
  if(!req.decodedToken.admin && !adminUsers.includes(req.decodedToken.email)) {
    res.status(401).send({ message: "User not authorized", success: false })
    return
  }
  console.log("Admin user:", req.decodedToken.email)
  next()
}