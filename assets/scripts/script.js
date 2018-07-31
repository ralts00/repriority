'use strict'

const listContainer = document.querySelector('#listContainer');
const newTaskDescription = document.querySelector('#newTaskDescription');
const buttonCreate = document.querySelector('#buttonCreate');
const listGroups = [
  {
    groupId: 0,
    listTasks: [
      {
        id: 1,
        description: '',
        status: 'todo',
        priority: null,
        project: ''
      },
      {
        id: 2,
        description: '',
        status: 'todo',
        priority: null,
        project: ''
      }
    ]
  }
];


//Create elements

const createForm = () => {
  const formHTML = `
    <form id="formGroup${id}">
      <input type="text" name="newTaskDescription" placeholder="Nueva tarea" id="newTaskDescription">
      <button type="button" onclick="newTask(this.form)" class="hidden" id="buttonCreate">Guardar tarea</button>
      <button type="button" onclick="setPriority(this.form)">Nueva sección</button>
    </form>
  `
}

// createForm();

const printTask = () => {
  listContainer.innerHTML = '';
  for(let item of listTasks) {
    const taskHTML = `
      <li>
        <button type="button" onclick="repriorityTask(${item.id})">
        Repriorizar</button>
        <input name="priority${item.id}" id="priority${item.id}" type="number" placeholder="#">
        <input name="project${item.id}" id="project${item.id}" type="text" placeholder="Proyecto">
        <button type="button" onclick="deleteTask(${item.id})">
        Eliminar
        </button>
        <button type="button" onclick="refreshTask(${item.id})">
          Terminar
        </button>
        </br>
        <span><strong>descripción:</strong> ${item.description} <strong>estatus:</strong> ${item.status} <strong>prioridad:</strong> ${item.priority}</span>
        <strong>project:</strong> ${item.project}</span>
      </li>
    `
    listContainer.innerHTML += taskHTML;
  }}



newTaskDescription.addEventListener('keyup', function(event) {
  // if (event.target.value != '') {
  //   showButtonCreate();
  // } else {
  //   hideButtonCreate();
  // }
  event.target.value !== '' ? showButtonCreate() : hideButtonCreate();
});

const showButtonCreate = () => {
  buttonCreate.classList.remove('hidden');
}

const hideButtonCreate = () => {
  buttonCreate.classList.add('hidden');
}

let newTask = (form) => {
  const description = form.newTaskDescription.value;
  const id = listTasks.length;
  const task = {
    id: id,
    description: description,
    status: 'todo',
    priority: null,
    project: ''
  }
  if(newTaskDescription.description != "") {
    listTasks.push(task);
    form.newTaskDescription.value = '';
    printTask();
  }
}

const refreshTask = (id) => {
  let projectTask = listTasks[id].project;
  let statusTask = listTasks[id].status;
  // if(statusTask == 'todo') {
  //   listTasks[id].status = 'done';
  // } else {
  //   listTasks[id].status = 'todo';
  // }
  listTasks[id].status = statusTask === 'todo' ? 'done' : 'todo';

  // if(projectTask !== '') {
  //   listTasks[id].project = 'done';
  // } else {
  //   listTasks[id].status = 'todo';
  // }
  printTask();
}

const setPriority = (form) => {
  for(let item of listTasks) {
    item.priority = form['priority' + item.id].value
  }
  printTask();
}

const repriorityTask = (id) => {
  const newPriority = (listTasks[id].priority) - 100;
  listTasks[id].priority =  newPriority;
  printTask();
}

const deleteTask = (id) => {
  listTasks[id].status = 'delete';
  printTask();
}
//
// const repriortyTask = (form) => {
//   console.log(form.btnRepriority0.classlist.remove(hidden));
// }
