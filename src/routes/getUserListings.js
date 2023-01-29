import { db } from '../utils/db'
import admin from 'firebase-admin'
import Boom from '@hapi/boom'

export const getUserListingRoute = {
  method: 'GET',
  path: '/api/v1/listings/users/{userId}/listings',
  handler: async (req, res) => {
    const userId = req.params.userId

    //getting auth-token from header
    const token = req.headers.authtoken
    const user = await admin.auth().verifyIdToken(token)
    if (user.user_id !== userId) {
      throw Boom.unauthorized('Invalid User')
    }

    const { results } = await db.query(
      'SELECT * FROM listings WHERE user_id=?',
      [userId]
    )

    return results
  },
}
