import { db } from '../utils/db'

export const getAllListingRoute = {
  method: 'GET',
  path: '/api/v1/listings',
  handler: async (req, res) => {
    const { results } = await db.query('SELECT * FROM listings')
    // console.log(results)
    return results
  },
}
