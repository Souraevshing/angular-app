import { Boom } from '@hapi/boom'

import { db } from '../utils/db'

export const getListingRoute = {
  method: 'GET',
  path: '/api/v1/listings/{id}',
  handler: async (req, res) => {
    const id = req.params.id
    const { results } = await db.query('SELECT * FROM listings WHERE id=?', [
      id,
    ])

    //fetching listing by id at zero'th position
    const listing = results[0]

    if (!listing) {
      throw Boom.notFound(`listing not found for id ${id}`)
    }
    return listing
  },
}
