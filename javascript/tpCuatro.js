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

//clean form
const clean = ()=>{
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('adress').value = '';
  document.getElementById('phone').value = '';

}

//close modal
const closeModal =()=>{
    const hiddenModal=() => modal.classList.add('hidden');
    clean();
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
      return `<div id="user${u.id}" class="data">
      <input type="checkbox" id="selectItem" class="check">
      <div>${u.name}</div>
      <div>${u.email}</div>
      <div>${u.adress}</div>
      <div>${u.phone}</div>
      <i class="material-icons yellow" title="edit" onClick="editUser(${u.id})">&#xE254;</i>
      <i class="material-icons red" title="delete" onClick="deleteUser(${u.id})">&#xE872;</i>
    </div>`;
    }).join('');

    usersData.innerHTML= eachUser;
})

//add employee
form.onsubmit = e=>{
  e.preventDefault();
    
  const newName = document.getElementById('name').value;
  const newEmail = document.getElementById('email').value;
  const newAdress = document.getElementById('adress').value;
  const newPhone = document.getElementById('phone').value;

  if (newName.length>30 || newName.trim().length === 0) {

    document.getElementById('name').value = 'Dato no válido'

  }else if (isNaN(newPhone)){
    document.getElementById('phone').value = 'Dato no válido'
  }

  
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
    const addUser= `<div class="data" id="user${u.id}">
    <input type="checkbox" id="selectItem" class="check">
    <div>${u.name}</div>
    <div>${u.email}</div>
    <div>${u.adress}</div>
    <div>${u.phone}</div>
    <i class="material-icons yellow" title="edit" onClick="editUser(${u.id})">&#xE254;</i>
    <i class="material-icons red" title="delete" onClick="deleteUser(${u.id})">&#xE872;</i>
  </div>`;

  usersData.innerHTML += addUser;

  
  closeModal();

  })
};

//delete user
const deleteUser = e => {

  //falta modal
  
  fetch(`${api}/${e}`, {method: 'delete'})
  .then(res=>{
    document.getElementById(`user${e}`).remove()
  })
}

//edit user
const editUser = e =>{

  fetch(`${api}/${e}/edit`, {
    method: 'put'
  })
  .then(res => res.json())
  .then(user=>{

    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('adress').value = user.adress;
    document.getElementById('phone').value = user.phone;

    openModal();
  })
}

function completar(id, button){
  console.log(id, button)

  fetch(`${dire}/${id}/completar`, {
      method: 'put'
  })
  .then(res => res.json())
  .then(todo=>{

      const li =document.getElementById(`${id}`)

      li
          .querySelector('span.estado')
          .innerHTML= todo.completada;

  })
  
}

