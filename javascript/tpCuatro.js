console.log('Hola mundo');

//selections
const modal = document.querySelector('.modal');
const usersData= document.querySelector('.users');
const form = document.getElementById('newEmployee');
const body = document.querySelector('body');
const deleteModal = document.querySelector('.delete-modal');


let usersList = [];

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

//open delete modal
const openDelete = ()=>{
  const visibleDelete = ()=>deleteModal.classList.remove('hidden');
  visibleDelete();
}
//close delete modal
const closeDelete =()=>{
  const hiddenDelete=() => deleteModal.classList.add('hidden');
  hiddenDelete();
}

//delete edit modal
const closeEditModal =()=>{
  const deleteModal = document.getElementById('editModal').remove();

}

//fetch
const api = 'http://localhost:4000/api/users'

fetch(api)
.then(res => res.json())
  .then( users=> {

    usersList = users

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

    usersList = u;
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

  openDelete();

  const buttonDelete = document.querySelector('.delete');
  buttonDelete.onclick = ()=>{
    fetch(`${api}/${e}`, {method: 'delete'})
    .then(res=>{
      document.getElementById(`user${e}`).remove()
      closeDelete();
    })
  } 
}

//edit user
const editUser = e =>{

  const idEditUser = e;
  console.log(idEditUser)

  usersList.forEach(u=>{

    if(u.id === idEditUser){
      const div = document.createElement('div');
      const addClass = ()=> div.classList.add('modal');
      addClass();
      div.setAttribute("id", "editModal");

      div.innerHTML = `
      <div class="modal-container">
          <div class="modal-top">
          <div class="modal-title">edit employee</div>
          <div class="close" onClick="closeEditModal()">x</div>
        </div>
        <form name="login" id="editUsersData">
            <div class="modal-subtitles">name</div>
            <input id="nameEdit" name="name" type="text"/>
            <div class="modal-subtitles">email</div>
            <input id="emailEdit" name="email" type="text"/>
            <div class="modal-subtitles">adress</div>
            <textarea id="adressEdit" name="adress" type="text"></textarea>
            <div class="modal-subtitles">phone</div>
            <input id="phoneEdit" name="phone" type="text" />
            <div class="modal-footer">  
              <input type="button" class="cancel" onclick="closeEditModal()" value="Cancel"/>
              <input type="submit" class="add" value="edit"/> 
            </div>
        </form>
      </div>`

      body.appendChild(div);

      document.getElementById('nameEdit').value = u.name;
      document.getElementById('emailEdit').value = u.email;
      document.getElementById('adressEdit').value = u.adress;
      document.getElementById('phoneEdit').value = u.phone;
   
    };
    });

    const editForm = document.getElementById('editModal');

    editForm.onsubmit = e=>{
      e.preventDefault();
    
      const userEdit = {

        name: document.getElementById('nameEdit').value,
        email: document.getElementById('emailEdit').value,
        adress: document.getElementById('adressEdit').value,
        phone: document.getElementById('phoneEdit').value,
      }
       console.log(userEdit) 
      fetch(`${api}/${idEditUser}/edit`, {
        method: 'put',
        body: JSON.stringify(userEdit),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res=> res.json())
      .then(user=>{ 

        const userWithChanges = document.getElementById(`user${idEditUser}`);
        console.log(user)
        console.log(userWithChanges)

        userWithChanges.innerHTML = `<input type="checkbox" id="selectItem" class="check">
        <div>${user.name}</div>
        <div>${user.email}</div>
        <div>${user.adress}</div>
        <div>${user.phone}</div>
        <i class="material-icons yellow" title="edit" onClick="editUser(${user.id})">&#xE254;</i>
        <i class="material-icons red" title="delete" onClick="deleteUser(${user.id})">&#xE872;</i>`

      })
      closeEditModal();
    }
    
}
  