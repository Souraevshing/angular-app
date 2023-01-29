import { db } from '../utils/db'
import admin from 'firebase-admin'

export const createNewListingRoute = {
  method: 'POST',
  path: '/api/v1/listings/create',
  handler: async (req, res) => {
    //generating random user_id
    const id = Math.random().toString(26).slice(2)

    const token = req.headers.authtoken
    const user = await admin.auth().verifyIdToken(token)
    const userId = user.user_id

    // console.log(id)

    //getting data from payload
    const { name = '', description = '', price = 0 } = req.payload

    const views = 0

    await db.query(
      `INSERT INTO listings (id,name,description,price,user_id,views) VALUES (?,?,?,?,?,?);`,
      [id, name, description, price, userId, views]
    )

    return { id, name, description, price, user_id: userId, views }
  },
}
