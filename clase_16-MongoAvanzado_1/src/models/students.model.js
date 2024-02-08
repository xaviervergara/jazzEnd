import mongoose from 'mongoose';

const studentCollection = 'students';

const studentSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  courses: {
    type: [
      {
        course: {
          type: mongoose.Schema.ObjectId,
          ref: 'courses',
        },
      },
    ],
    default: [],
  },
});

//  Estructura de courses:

// courses = [
//     {course: ObjectId('123123123')},
//     {course: ObjectId('123123123')},
//     {course: ObjectId('123123123')},
// ]

export const studentModel = mongoose.model(studentCollection, studentSchema);
