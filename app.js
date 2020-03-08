// Define UI Variables 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Loading event listener function 
loadEventListeners();

// Defining the event listener function 
function loadEventListeners() {
    // DOM load event 
    document.addEventListener('DOMContentLoaded', getTasks)
    // create function to add the task  
    form.addEventListener('submit', addTask);
    // function for removing the list item
    taskList.addEventListener('click', removeTask);
    // function for removing all tasks 
    clearBtn.addEventListener('click', clearTasks);
    // filter 
    filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        // create the list element
        const li = document.createElement('li');
        // add the class for ui design 
        li.className = 'collection-item';
        // append the input text to the list 
        li.appendChild(document.createTextNode(task));
        // add the link details which bears the UI elements 
        const link = document.createElement('a');
        // add class details 
        link.className = 'delete-item secondary-content';
        // add icon html from font awesome 
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        // add the link details to the li element which is now the parent of the link 
        li.appendChild(link);
        // add the li to the list 
        taskList.appendChild(li);
    })
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Please enter a value');
    }

    // else we create the li elements 
    // create the list element
    const li = document.createElement('li');
    // add the class for ui design 
    li.className = 'collection-item';
    // append the input text to the list 
    li.appendChild(document.createTextNode(taskInput.value));
    // add the link details which bears the UI elements 
    const link = document.createElement('a');
    // add class details 
    link.className = 'delete-item secondary-content';
    // add icon html from font awesome 
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // add the link details to the li element which is now the parent of the link 
    li.appendChild(link);
    
    // add the li to the list 
    taskList.appendChild(li);

    // Storing function 
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    // select the task
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();

    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}
}

// Remove task from ls 
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    // easy option is to completely remove the element but it is inefficient 
    //taskList.innerHTML = '';


    // instead we can use a while loop to remove first child elements 
    if(confirm('Are you sure')) {
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
            }
    }

    // local storage function clear 
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
