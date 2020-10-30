const taskInput = document.querySelector('#task');
const form=document.querySelector('#task-form');
const clrBtn=document.querySelector(".clear-tasks");
const filter=document.querySelector('#filter');
const taskList=document.querySelector('.collection');


loadEventListeners();

function loadEventListeners()
{
  document.addEventListener('DOMContentLoaded',getTasks);
  form.addEventListener('submit',addTask);
  clrBtn.addEventListener('click',clearTasks);
  taskList.addEventListener('click',deleteItem);
  filter.addEventListener('keyup',filtertasks);
}


function getTasks()
{
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fas fa-trash"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
  });
}


function addTask(e){
  if(taskInput.value===''){
    alert("Enter any Task")
  }

  const li=document.createElement('li');
  li.className='collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  const link=document.createElement('a');
  link.className='delete-item secondary-content';
  link.innerHTML='<i class="fas fa-trash"></i>';
  li.appendChild(link);

  taskList.appendChild(li);
  storeTaskInLocalStorage(taskInput.value);
  
  taskInput.value='';

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function deleteItem(e)
{
  console.log(e.target);
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you Sure?')){
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    }
  }

  e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function clearTasks()
{
  while(taskList.firstChild)
  {
    taskList.removeChild(taskList.firstChild);
    clearTasksFromLocalStorage();

  }
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filtertasks(e)
{
  const text=e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item=task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!=-1)
    {
      task.style.display='block';
    }
    else{
      task.style.display='none';
    }
  })

}