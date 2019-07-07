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

