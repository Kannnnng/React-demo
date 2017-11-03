/**
 *
 * Library reducer
 *
 */

import { createSelector } from 'reselect'

const selectLibraryDomain = (state) => state.get('library')

const selectLibrary = () => createSelector(
  selectLibraryDomain,
  (substate) => substate.toJS()
)

export default selectLibrary
