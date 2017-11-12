import { schema } from 'normalizr'

export const Chapters = new schema.Array(new schema.Entity('chapters'))
export const Coursewares = new schema.Array(new schema.Entity('coursewares'))
export const CourseGroup = new schema.Entity('courseGroup', {}, {
  idAttribute: 'groupId',
})
export const CourseGroups = new schema.Array(new schema.Entity('courseGroups', {
  chapters: Chapters,
}, {
  idAttribute: 'groupId',
}))
export const Labels = new schema.Array(new schema.Entity('labels'))
export const Classrooms = new schema.Array(new schema.Entity('classrooms', {
  units: Chapters,
}))
export const Courses = new schema.Array(new schema.Entity('courses', {
  chapters: Chapters,
}))
export const SubQuestions = new schema.Array(new schema.Entity('subQuestions'))
export const Questions = new schema.Array(new schema.Entity('questions', {
  labels: Labels,
  subQuestions: SubQuestions,
}))
export const Quizzes = new schema.Array(new schema.Entity('quizzes', {
  subQuestions: Questions,
}))
