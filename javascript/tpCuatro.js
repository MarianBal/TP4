console.log('Hola mundo');

//selections
const modal = document.querySelector('.modal');

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

fetch('http://localhost:4000/api/users')
  .then(function (res) {
    return res.json();
  })
  .then( (users)=> {
    const eachUser = users.map( u=> {
      return 'algo';
    
    });
})

