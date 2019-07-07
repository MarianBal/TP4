const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  {nombre: 'Ada', apellido: 'Lovelace', telefono: '1234567890', email: 'contacto@gmail.com'},
  {nombre: 'Grace', apellido: 'Hopper', telefono: '087654321', email: 'contacto@hotmail.com'}
]

app.get('/api/users', function (req, res) {
  res.json(users);
});

app.listen(4000)