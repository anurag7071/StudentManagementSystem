const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  schoolName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  photo: { type: String, required: true },
});

studentSchema.pre('save', function(next) {
  const student = this;
  if (!student.isModified('password')) {
    return next();
  }
  bcrypt.hash(student.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    student.password = hash;
    next();
  });
});

studentSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
