const texto = document.querySelector('input');
const btnInsert = document.querySelector('.insert button');
const btnDeleteAll = document.querySelector('.header button');
const ul = document.querySelector('ul');
const alert = document.getElementById('alert');

var itensDB = [];

btnDeleteAll.onclick = () => {
  alert.style.display = 'flex';
}

function okDelete() {
  itensDB = [];
  updateDB();
  alert.style.display = 'none';
}

function okCancel() {
  alert.style.display = 'none';
}

texto.addEventListener('keypress', e => {
  if (e.key == 'Enter' && texto.value != '') {
    setItemDB()
  }
})

btnInsert.onclick = () => {
  if (texto.value != '') {
    setItemDB()
  }
}

function setItemDB() {
  if (itensDB.length >= 10) {
    alert('Maximum limit of 10 items reached!')
    return;
  }

  itensDB.push({ 'item': texto.value, 'status': '' })
  updateDB()
}

function updateDB() {
  localStorage.setItem('todolist', JSON.stringify(itensDB))
  loadItens()
}

function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
  itensDB.forEach((item, i) => {
    insertItem(item.item, item.status, i)
  })
}

function insertItem(text, status, i) {
  const li = document.createElement('li')

  li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
  ul.appendChild(li)

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
  }

  texto.value = ''
}

function done(chk, i) {

  if (chk.checked) {
    itensDB[i].status = 'checked'
  } else {
    itensDB[i].status = ''
  }

  updateDB()
}

function removeItem(i) {
  itensDB.splice(i, 1)
  updateDB()
}

loadItens()
