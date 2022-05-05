const teacherModel = require('./teacher');
const courseModel = require('./course');
const studentModel = require('./student');

module.exports = {
    Query: {
        teacher: (parent, args) => this.teacherModel.getById(args),
        teachers: () => teacherModel.list(),
        courses: courseModel.list(),
        students: studentModel.list()
    },
    Teacher: {
        courses: (teacher) => courseModel.listForTeacher(teacher)
    },
    Course: {
        teacher: (course) => teacherModel.getByCourse(course),
        students: (course) => studentModel.listForCourse(course)
    },
    Student: {
        courses: (student) => courseModel.listForStudent(student)
    }
};