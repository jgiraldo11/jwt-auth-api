import express from 'express'
import cors from 'cors'
import { onRequest } from 'firebase-functions/v2/https'
import { vailidToken, matchingUser } from './src/middleware.js'
import { signup, login, getProfile, updateProfile } from './src/users.js'

const app = express()
  app.use(cors()) // allow access from other domains
  app.use(express.json()) // patch and post in json

  // routes:
app.post("/signup", signup)
app.post("/login", login)

// protected: (authenticated usrers only)
app.get("/profile", vailidToken, getProfile)
app.patch("/profile", vailidToken, matchingUser, updateProfile)
// app.patch("/profile",validToken, updateProfile)


  export const api = onRequest(app) // send all https requests to express
