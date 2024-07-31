/*********************************************************************************
* WEB700 – Assignment 4
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Hafsa Osman Student ID:168312239  Date: 14/06/2024
*
********************************************************************************/
require("pg");
const Sequelize = require('sequelize');

const PGHOST='ep-shrill-morning-a5dd4zpz.us-east-2.aws.neon.tech';
const PGDATABASE='HafsaOsman';
const PGUSER='HafsaOsman_owner';
const PGPASSWORD='ICOc2XBW8GQM';

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});

const Student = sequelize.define('Student', {
    studentNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressProvince: Sequelize.STRING,
    TA: Sequelize.BOOLEAN,
    status: Sequelize.STRING
});

const Course = sequelize.define('Course', {
    courseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseCode: Sequelize.STRING,
    courseDescription: Sequelize.STRING
});

Course.hasMany(Student, { foreignKey: 'course' });

// Implement the initialize function
function initialize() {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve();
        }).catch((err) => {
            reject("unable to sync the database");
        });
    });
}

// Step 5: Implement the getAllStudents function
function getAllStudents() {
    return new Promise((resolve, reject) => {
        Student.findAll()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject("no results returned");
            });
    });
}

// Implement the getTAs function
// function getTAs() {
//     return new Promise((resolve, reject) => {
//         if (dataCollection) {
//             let TAs = dataCollection.students.filter(student => student.TA === true);
//             if (TAs.length > 0) {
//                 resolve(TAs);
//             } else {
//                 reject("no results returned");
//             }
//         } else {
//             reject("no results returned");
//         }
//     });
// }

// Implement the getCourses function
function getCourses() {
    return new Promise((resolve, reject) => {
        Course.findAll()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject("no results returned");
            });
    });
}

// Step 9: Implement the addStudent function
function addStudent(student) {
    return new Promise((resolve, reject) => {
        
        Student.create(student)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject("unable to create student");
            });
            
    });
}

function getStudentById(id) {
    return new Promise((resolve, reject) => {
        Student.findAll({
            where: {
                studentNum: id
            }
        })
        .then(data => {
            resolve(data[0]); // Return the first (and only) record found
        })
        .catch(err => {
            reject("no results returned");
        });
    });
}

function getCourseById(id) {
    return new Promise((resolve, reject) => {
        Course.findAll({
            where: {
                courseId: id
            }
        })
        .then(data => {
            resolve(data[0]); // Return the first (and only) record found
        })
        .catch(err => {
            reject("no results returned");
        });
    });
}

function updateStudent(studentData) {
    return new Promise((resolve, reject) => {
        // Set empty string fields to null to handle empty form submissions
        for (let key in studentData) {
            if (studentData[key] === '') {
                studentData[key] = null;
            }
        }

        Student.update(studentData, {
            where: { studentNum: studentData.studentNum }
        })
        .then(() => {
            resolve();
        })
        .catch(err => {
            reject("unable to update student");
        });
    });
}

getStudentsByCourse = function (course) {
    return new Promise((resolve, reject) => {
        Student.findAll({
            where: {
                course: courseId
            }
        })
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject("no results returned");
        });
    });
};

deleteStudentById= function(studentNum) {
    return new Promise((resolve, reject) => {
        Student.destroy({
            where: { studentNum: studentNum }
        })
        .then(() => {
            resolve();
        })
        .catch(err => {
            reject("unable to delete student");
        });
    });
};

addCourse = function(courseData) {
    return new Promise((resolve, reject) => {
        // Set empty string fields to null to handle empty form submissions
        for (let key in courseData) {
            if (courseData[key] === '') {
                courseData[key] = null;
            }
        }

        Course.create(courseData)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject("unable to create course");
            });
    });
};

updateCourse = function(courseData) {
    return new Promise((resolve, reject) => {
        // Set empty string fields to null to handle empty form submissions
        for (let key in courseData) {
            if (courseData[key] === '') {
                courseData[key] = null;
            }
        }

        Course.update(courseData, {
            where: { courseId: courseData.courseId }
        })
        .then(() => {
            resolve();
        })
        .catch(err => {
            reject("unable to update course");
        });
    });
};

deleteCourseById = function(id) {
    return new Promise((resolve, reject) => {
        Course.destroy({
            where: { courseId: id }
        })
        .then(() => {
            resolve();
        })
        .catch(err => {
            reject("unable to delete course");
        });
    });
};


// Export the functions
module.exports = {
    initialize,
    getAllStudents,
    getCourses,
    addStudent,
    getStudentById,
    updateStudent,
    getCourseById,
    getStudentsByCourse,
    deleteStudentById,
    addCourse,
    updateCourse,
    deleteCourseById
};
