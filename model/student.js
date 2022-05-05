const async = require('hbs/lib/async');
const dbcPool = require('./db');

let Student = {};

Student.list = async function () {

    // SELECT teacherId, `first`, `last`

    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT studentId as `id`, `first`, `last` FROM student");
    dbConn.end();
    //console.log(rows);
    return rows;
}

Student.listForCourse = async function (course) {

    // SELECT studentId as `id`, `first`, `last` FROM student JOIN coursestudent.studentId ON coursestudent.studentId = student.studentId WHERE courseId = 1

    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT student.studentId as `id`, `first`, `last` FROM student JOIN coursestudent ON coursestudent.studentId = student.studentId WHERE courseId = ?");
    dbConn.end();
    //console.log(rows);
    return rows;
}

Student.getById = async (args) => {
    let dbConn = await dbcPool.getConnection();
    const row = await dbConn.query("SELECT studentId as `id`, `first`, `last` FROM student WHERE studentId = ?",
        [args.id]);

    dbConn.end();

    return row[0];
}


module.exports = Student;