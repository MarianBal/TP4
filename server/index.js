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

app.get('/api/users/:userId', (req, res) => {
  const id = parseInt(req.params.userId)

  users.map(user=>{
    if(user.id === id){
      return user
    }
  })
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = req.body; 

  if (newUser.name.length>30 || newUser.name.trim().length === 0) {

   return res.status(400).end();
  } else {
  newUser.id = nextId(users);

  users.push(newUser);

  res.json(newUser);
  }
});

app.delete('/api/users/:userId', function (req, res) {
  const id = parseInt(req.params.userId);

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users.splice(i, 1);
    }
  }

  res.json(users);
});

app.put('/api/users/:userId/edit', function (req, res) {
  const editUser = req.body;

  const id = userId;

  users.forEach(user=>{
    if (id == user.id) {

      user.name = editUser.name;
      user.phone = editUser.phone;
      user.email = editUser.email;
      user.adress = editUser.adress;

      console.log(user)

      return res.json(user);
    }
  });
})


app.listen(4000)