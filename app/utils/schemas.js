import { schema } from 'normalizr'

export const Libraries = new schema.Array(new schema.Entity('libraries'))