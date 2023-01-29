import { db } from '../utils/db'
import admin from 'firebase-admin'

export const updateListingRoute = {
  method: 'POST',
  path: '/api/v1/listings/update/{id}',
  handler: async (req, res) => {
    const { id } = req.params
    const { name, description, price } = req.payload

    const token = req.headers.authtoken
    const user = await admin.auth().verifyIdToken(token)
    const userId = user.user_id

    await db.query(
      `UPDATE listings SET name=?, description=?,price=? WHERE id=? AND user_id=?`,
      [name, description, price, id, userId]
    )

    const { results } = await db.query(
      'SELECT * FROM listings WHERE id=? AND user_id=?',
      [id, userId]
    )
    //console.log(results)
    return results[0]
  },
}
