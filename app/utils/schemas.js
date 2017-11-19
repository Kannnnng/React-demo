import { schema } from 'normalizr'

/* 章节 */
export const Chapters = new schema.Array(new schema.Entity('chapters'))
/* 课件 */
export const Coursewares = new schema.Array(new schema.Entity('coursewares'))
/* 单个课程组 */
export const CourseGroup = new schema.Entity('courseGroup', {}, {
  idAttribute: 'groupId',
})
/* 课程组 */
export const CourseGroups = new schema.Array(new schema.Entity('courseGroups', {
  chapters: Chapters,
}, {
  idAttribute: 'groupId',
}))
/* 知识点 */
export const Labels = new schema.Array(new schema.Entity('labels'))
/* 课堂 */
export const Classrooms = new schema.Array(new schema.Entity('classrooms', {
  chapters: Chapters,
}, {
  idAttribute: 'courseId',
}))
/* 课程 */
export const Courses = new schema.Array(new schema.Entity('courses', {
  chapters: Chapters,
}))
/* 题组、组卷中的子题 */
export const SubQuestions = new schema.Array(new schema.Entity('subQuestions'))
/* 题目 */
export const Questions = new schema.Array(new schema.Entity('questions', {
  labels: Labels,
  subQuestions: SubQuestions,
}))
/* 组卷 */
export const Quizzes = new schema.Array(new schema.Entity('quizzes', {
  subQuestions: Questions,
}))
