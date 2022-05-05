
const dbcPool = require('./db');

let Course = {};

Course.list = async function () {

    // SELECT courseId AS `id`, `name`, `description` FROM course

    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT courseId AS `id`, `name`, `description` FROM course");


    let list = [];
    for (let i = 0; i < rows.length; i++) {
        list.push(rows[i])
    }
    dbConn.end();
    //console.log(rows);
    return rows;
}

Course.listForTeacher = async (teacher) => {
    // SELECT courseId as `id`, `name`, `description` FROM course WHERE teacherId = 1
    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT courseId as `id`, `name`, `description` FROM course WHERE teacherId = ?", [teacher.id]);

    dbConn.end();
    return rows;
}

Course.listForStudent = async (student) => {
    // SELECT course.courseId AS `id`, course.`name`, course.`description` FROM course
    // JOIN coursestudent ON coursestudent.`courseId` = course.courseId WHERE studentId =1

    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT course.courseId AS `id`, course.`name`, course.`description` FROM course JOIN coursestudent ON coursestudent.`courseId` = course.courseId WHERE studentId =?", [student.id]);

    dbConn.end();
    return rows;
}

// Course.getById = async (args) => {
//     let dbConn = await dbcPool.getConnection();
//     const row = await dbConn.query("SELECT teacherId as `id`, `first`, `last` FROM teacher WHERE teacherId = ?",
//         [args.id]);

//     dbConn.end();

//     return row[0];
// }


module.exports = Course;