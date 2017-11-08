import { schema } from 'normalizr'

export const Chapters = new schema.Array(new schema.Entity('chapters'))
export const Coursewares = new schema.Array(new schema.Entity('coursewares'))
export const CourseGroups = new schema.Array(new schema.Entity('courseGroups', {
  idAttribute: 'groupId',
}))
export const Labels = new schema.Array(new schema.Entity('labels'))
export const Classrooms = new schema.Array(new schema.Entity('classrooms'))
export const Courses = new schema.Array(new schema.Entity('courses'))
export const Questions = new schema.Array(new schema.Entity('questions'))
export const Quizzes = new schema.Array(new schema.Entity('quizzes'))