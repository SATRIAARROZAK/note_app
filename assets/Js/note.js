'use strict';

// Get modal elements
const modal = document.getElementById("modal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");
const judulNote = document.getElementById('judulNote');
const isiNote = document.getElementById('isiNote');
const btnSubmit = document.getElementById('btnSubmit');
const list = document.getElementById('list');
// Open modal
openModalButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close modal
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});


// Create Note body 
btnSubmit.addEventListener('click',saveItems);

function saveItems() {
  console.log('Klick');
  
  let li = document.createElement('li');
  li.className = 'list-items';
  const classLenght = document.querySelectorAll('.list-items').length;
  li.id = classLenght + 1;

  const h1 = document.createElement('h1');
  h1.className = ('judul');
  const judul = document.createTextNode(judulNote.value);
  h1.appendChild(judul);
  li.appendChild(h1);

  const p = document.createElement('p');
  p.className = ('catat');
  const catat = document.createTextNode(isiNote.value);
  p.appendChild(catat);
  li.appendChild(p);


  const dateDisplay = new Date()
  const span = document.createElement('span');
  span.className = ('date');
  const date = document.createTextNode(dateDisplay.toLocaleString);
  span.appendChild(date);
  li.appendChild(span);

  const lastId = document.getElementById(classLenght);
  list.insertBefore(li,lastId)
  judulNote.value = '';
  isiNote.value = '';
}
