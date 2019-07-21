const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  {id: 1, name: 'bruce wayne', phone: '08009991111', email: 'bruce@wayneenterpreises.com', adress: 'Gotham City'},
  {id: 2, name: 'ada lovelace', phone: '0554755558', email: 'contacto@gmail.com', adress: 'flores'},
  {id: 3, name: 'grace hopper', phone: '26588833448', email: 'contacto@hotmail.com', adress: 'Almagro'}
]

const nextId = (e = []) => e.length ? (e[e.length - 1].id + 1) : 1;

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
  const emailSearch = /^\w.*@\w+\.\w/.test(newUser.email);

  if (newUser.name.length>30 || newUser.name.trim().length === 0) {

   return res.status(400).send('Salió todo mal');

  } else if(emailSearch == false || newUser.email.trim().length === 0){

    return res.status(400).send('Salió todo mal');

  }else if (isNaN(newUser.phone) || newUser.phone.trim().length === 0){

    return res.status(400).send('Salió todo mal');

  }else {
  newUser.id = nextId(users);

  users.push(newUser);

  res.status(200).send();
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

  const id = req.params.userId;

  const editEmailSearch = /^\w.*@\w+\.\w/.test(editUser.email);

  if (editUser.name.length>30 || editUser.name.trim().length === 0) {

   return res.status(400).send('Salió todo mal');

  } else if(editEmailSearch == false || editUser.email.trim().length === 0){

    return res.status(400).send('Salió todo mal');

  }else if (isNaN(editUser.phone) || editUser.phone.trim().length === 0){

    return res.status(400).send('Salió todo mal');
  
  }else{
    res.status(200).send()
  }

    users.forEach(user=>{
      if (id == user.id) {

        user.name = editUser.name;
        user.phone = editUser.phone;
        user.email = editUser.email;
        user.adress = editUser.adress;

        return res.json(user);
      }
    });
})

app.get('/api/users/search/:search', (req, res) => {
  const searchUser = req.params.search;

  const found = users.filter(u=> {
    if(u.name.match(searchUser) || u.phone.match(searchUser) || u.email.match(searchUser)){
      return u;
    }
  });
 
  res.json(found);
});


app.listen(4000)