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
      <div>${u.name} ${u.lastname}</div>
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
    console.log(e)
}