const async = require('hbs/lib/async');
const dbcPool = require('./db');

let Teacher = {};

Teacher.list = async function () {

    // SELECT teacherId, `first`, `last`

    let dbConn = await dbcPool.getConnection();
    const rows = await dbConn.query("SELECT teacherId as `id`, `first`, `last` FROM teacher");
    dbConn.end();
    //console.log(rows);
    return rows;
}

Teacher.getById = async (args) => {
    let dbConn = await dbcPool.getConnection();
    const row = await dbConn.query("SELECT teacherId as `id`, `first`, `last` FROM teacher WHERE teacherId = ?"[args.id],
        [args.id]);

    dbConn.end();

    return row[0];
}

Teacher.getByCourse = async (course) => {
    // SELECT teacher.teacherId AS `id`,`first`, `last` FROM course JOIN teacher ON course.teacherId WHERE courseId =1
    let dbConn = await dbcPool.getConnection();
    const row = await dbConn.query("SELECT teacher.teacherId AS `id`,`first`, `last` FROM course JOIN teacher ON course.teacherId WHERE courseId =?", [course.id],
        [args.id]);

    dbConn.end();

    return row[0];
}

module.exports = Teacher;