const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  {id: 1, name: 'Bruce Wayne', phone: '08009991111', email: 'bruce@wayneenterpreises.com', adress: 'Gotham City'}
]

const nextId = (e=[]) =>{
  e.length ? (e[e.length-1].id + 1) : 1; 
}

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = req.body; 

  if (newUser.name.length>30 || newUser.name.trim().length === 0) {
    // un aviso
    // un res
    // return
    console.log('la cagaste')
   return res.status(400).end();
  } else{
  newUser.id = nextId(users);

  users.push(newUser);

  res.json(newUser);
  }
});

app.listen(4000)