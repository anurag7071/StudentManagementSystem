const Student = require("../models/student");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
  const { firstName, lastName, schoolName, email, mobile, password, photo } = req.body;
  Student.findOne({ email: email })
    .then(student => {
      if (student) {
        return res.status(400).json({
          message: "Email already exists"
        });
      }
      Student.findOne({ mobile: mobile })
        .then(student => {
          if (student) {
            return res.status(400).json({
              message: "Mobile number already exists"
            });
          }
          bcrypt.hash(password, 12)
            .then(hashedPassword => {
              const newStudent = new Student({
                firstName,
                lastName,
                schoolName,
                email,
                mobile,
                password: hashedPassword,
                photo
              });
              newStudent.save()
                .then(student => {
                  res.status(201).json({
                    message: "Student registered successfully",
                    student: student
                  });
                })
                .catch(error => {
                  res.status(500).json({
                    error: error
                  });
                });
            })
            .catch(error => {
              res.status(500).json({
                error: error
              });
            });
        })
        .catch(error => {
          res.status(500).json({
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
};

exports.login = (req, res, next) => {
  const { mobile, password } = req.body;
  Student.findOne({ mobile: mobile })
    .then(student => {
      if (!student) {
        return res.status(401).json({
          message: "Mobile number does not exist"
        });
      }
      bcrypt.compare(password, student.password)
        .then(result => {
          if (!result) {
            return res.status(401).json({
              message: "Password is incorrect"
            });
        }})
    })
}