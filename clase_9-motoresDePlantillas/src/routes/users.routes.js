import { Router } from 'express';

const usersRoutes = Router();

export const users = [
  {
    firstName: 'Xavier',
    lastName: 'Vergara',
    age: 30,
    email: 'asd@gmail.com',
    phone: 132484121,
    role: 'admin',
  },
  {
    firstName: 'Juan',
    lastName: 'Aguirre',
    age: 21,
    email: 'juanAAG@gmail.com',
    phone: 31685121,
    role: 'admin',
  },
  {
    firstName: 'Damian',
    lastName: 'Gutierrez',
    age: 29,
    email: 'damingutt@gmail.com',
    phone: 636659879,
    role: 'user',
  },
  {
    firstName: 'Jesus',
    lastName: 'Moreira',
    age: 44,
    email: 'yisucraist@gmail.com',
    phone: 647788423,
    role: 'user',
  },
  {
    firstName: 'Abel',
    lastName: 'Ramirez',
    age: 60,
    email: 'abelleram@gmail.com',
    phone: 8752322156,
    role: 'user',
  },
];

usersRoutes.post('/', (req, res) => {
  try {
    const user = req.body;
    users.push(user);
    res.send({ message: 'User added' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Error al agregar usuario' });
  }
});

usersRoutes.get('/', (req, res) => {
  res.send({ users });
});

export default usersRoutes;
