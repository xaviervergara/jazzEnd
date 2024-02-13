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
      //esto significa que es de tipo array
      {
        course: {
          type: mongoose.Schema.ObjectId,
          ref: 'courses', //refe para que se conecte al modelo de courses
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

//Con este middleware por defecto se muestra el population sin tener que hacer .populate en el metodo find en el get
//se usa function() porque necesitamos el this que en este caso hace referencia al schema
studentSchema.pre('find', function () {
  this.populate('courses.course');
});

export const studentModel = mongoose.model(studentCollection, studentSchema);
