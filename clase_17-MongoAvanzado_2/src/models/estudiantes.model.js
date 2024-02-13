import mongoose from 'mongoose';

const studentsCollection = 'students';

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
  },
  gender: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
});

export const studentModel = mongoose.model(studentsCollection, studentSchema);
