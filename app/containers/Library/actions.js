/**
 *
 * Library actions
 *
 */

import { createAction } from 'redux-actions'
import {
  request,
} from './sources'

export const defaultAction = createAction('APP/LIBRARY/DEFAULT_ACTION', request)
