import { createAction } from 'redux-actions'
import {
  test,
} from 'sources/Test'

export const testAction = createAction('TEST_ACTION', test)
