import { db } from '../utils/db'

export const addViewToListingRoute = {
  method: 'POST',
  path: '/api/v1/listings/{id}/add-view',
  handler: async (req, res) => {
    const id = req.params.id
    await db.query('UPDATE listings SET views=views+1 WHERE id=?', [id])

    const { results } = await db.query('SELECT * FROM listings WHERE id=?', [
      id,
    ])

    const updatedListings = results[0]
    return updatedListings
  },
}
