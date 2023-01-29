import { addViewToListingRoute } from './addViewToListing'
import { createNewListingRoute } from './createNewListing'
import { deleteListingRoute } from './deleteListing'
import { getAllListingRoute } from './getAllListing'
import { getListingRoute } from './getListing'
import { getUserListingRoute } from './getUserListings'
import { updateListingRoute } from './updateListing'

export default [
  getAllListingRoute,
  getListingRoute,
  addViewToListingRoute,
  getUserListingRoute,
  createNewListingRoute,
  updateListingRoute,
  deleteListingRoute,
]
