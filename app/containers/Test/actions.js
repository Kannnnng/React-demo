import { createAction } from 'redux-actions'
import {
  test,
} from './sources'

export const testAction = createAction('TEST_ACTION', test)
