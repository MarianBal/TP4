console.log('Hola mundo');

//selections
const modal = document.querySelector('.modal');
const usersData= document.querySelector('.users');
const form = document.getElementById('newEmployee');

//open modal
const openModal = ()=>{
    const visibleModal = ()=>modal.classList.remove('hidden');
    visibleModal();
}

//close modal
const closeModal =()=>{
    const hiddenModal=() => modal.classList.add('hidden');
    hiddenModal();
}

//fetch
const api = 'http://localhost:4000/api/users'

fetch(api)
  .then(function (res) {
    return res.json();
  })
  .then( (users)=> {
    const eachUser = users.map( u=> {
      return `<div class="data">
      <input type="checkbox" id="selectItem" class="check">
      <div>${u.name}</div>
      <div>${u.email}</div>
      <div>${u.adress}</div>
      <div>${u.phone}</div>
      <i class="material-icons yellow" title="Edit">&#xE254;</i>
      <i class="material-icons red" title="Delete">&#xE872;</i>
    </div>`;
    }).join('');

    usersData.innerHTML= eachUser;
})

//add emplyee
form.onsubmit = e=>{
  e.preventDefault();
    
  const newName = document.getElementById('name').value;
  const newEmail = document.getElementById('email').value;
  const newAdress = document.getElementById('adress').value;
  const newPhone = document.getElementById('phone').value;
  
  const newUser = {
    name:newName,
    mail:newEmail,
    adress: newAdress,
    phone:newPhone
  }
  
  fetch(api, {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(u=>{
    const addUser= `<div class="data">
    <input type="checkbox" id="selectItem" class="check">
    <div>${u.name}</div>
    <div>${u.email}</div>
    <div>${u.adress}</div>
    <div>${u.phone}</div>
    <i class="material-icons yellow" title="Edit">&#xE254;</i>
    <i class="material-icons red" title="Delete">&#xE872;</i>
  </div>`;

  usersData.innerHTML += addUser;

  closeModal();

  })
}