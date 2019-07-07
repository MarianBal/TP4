const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  {name: 'Bruce', lastname: 'Wayne', phone: '08009991111', email: 'bruce@wayneenterpreises.com', adress: 'Gotham City'}
]

app.get('/api/users', function (req, res) {
  res.json(users);
});

app.listen(4000)