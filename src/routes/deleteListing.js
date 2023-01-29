import { db } from '../utils/db'
import admin from 'firebase-admin'

export const deleteListingRoute = {
  method: 'DELETE',
  path: '/api/v1/listings/delete/{id}',
  handler: async (req, res) => {
    const { id } = req.params
    const token = req.headers.authtoken
    const user = await admin.auth().verifyIdToken(token)
    const userId = user.user_id

    await db.query('DELETE FROM listings WHERE id=? AND user_id=?', [
      id,
      userId,
    ])

    return { message: 'Deleted!' }
  },
}
