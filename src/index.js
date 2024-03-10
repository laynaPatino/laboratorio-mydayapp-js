import "./css/base.css";

//import { sayHello } from "./js/utils";
import { TaskManager } from './js/solution.js';

//console.log(sayHello("Hello"));

// solution
const taskManager = new TaskManager();
const todoList = document.querySelector('.todo-list');
const mainSection = document.querySelector('.main');
const footerSection = document.querySelector('.footer');
const taskCount = document.querySelector('.todo-count');
const filtersTask = document.querySelectorAll('.filters a');

document.addEventListener('DOMContentLoaded', function() {
    const clearTasks = () => {
        todoList.innerHTML = '';
        taskManager.clearTasks();
        hideMainAndFooterSections();
    }
    document.querySelector('.clear-completed').addEventListener('click', clearTasks);
});

const valueInput = () => {
    const inputTodo = document.querySelector('#value-new-todo');
    inputTodo.addEventListener('keypress', function(event) {
        if (event.keyCode === 13 && inputTodo.value != '') {
            let todoText = inputTodo.value;
            todoText = todoText.trim();
            inputTodo.value = ''; 
            creatTaskItem(todoText);
            hideMainAndFooterSections();
            countTaskPending();
        } else if (event.keyCode === 13 && inputTodo.value === '') {
            alert("ingresa un nombre para la tarea!.");
        }
    });
}

const creatTaskItem = (nameNewTask) => {
    taskManager.createTask(nameNewTask, false);
    let task = taskManager.getTaskByTitle(nameNewTask);
    taskList(task);
}

const taskList = (task) => {
    const li = document.createElement('li');
    if (task.completed === true){
        li.classList.add('completed');
    }
    li.innerHTML = `
    <div class="view">
        <input class="toggle" type="checkbox" ${task.completed ? 'checked' : ''} />
        <label>${task.title}</label>
        <button class="destroy" ></button>
    </div>
    <input class="edit" value="${task.title}"/>`;
    destroy(task,li)
    completedTask(task,li);
    editing(task,li);
    todoList.appendChild(li);
}

const completedTask = (task,li) => {
    const checkbox = li.querySelector('.toggle');
    checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
            li.classList.add('completed');
            taskManager.updateStatusTask(task.id,true);
            countTaskPending();
        } else {
            li.classList.remove('completed');
            taskManager.updateStatusTask(task.id,false);
            countTaskPending();
        }
    });

}

const destroy = (task,li) => {
    const destroyButton = li.querySelector('.destroy');
    destroyButton.addEventListener('click', () => {
        taskManager.deleteTask(task.id);
        todoList.removeChild(li);
        console.log(taskManager.getTasks())
        hideMainAndFooterSections();
        countTaskPending();
    }); 
}

const editing = (task, li) => {
    li.addEventListener('dblclick', () => {
        li.classList.add('editing');
        const editInput = li.querySelector('.edit');
        const label = li.querySelector('label');
        editInput.addEventListener('keyup', function(event) {
            if (event.keyCode === 13) {
                const editText = editInput.value.trim();
                if (editText !== '') {
                    taskManager.updateTask(task.id, editText, task.completed);
                    label.textContent = editText;
                    li.classList.remove('editing');
                } else {
                    alert("Ingresa un nombre para la tarea.");
                }
            } else if (event.keyCode === 27) { 
                editInput.value = task.title;
                li.classList.remove('editing');
            }
        });
    });
}

const hideMainAndFooterSections = () => {
    if (taskManager.getTasks().length === 0) {
        mainSection.style.display = 'none';
        footerSection.style.display = 'none';
    } else {
        mainSection.style.display = 'block';
        footerSection.style.display = 'block';
    }
}

const countTaskPending = () => {
        const filteredTasks = taskManager.getTasks().filter(task => task.completed === false);
        const filteredTasksLength = filteredTasks.length;
        const itemLeftText = filteredTasksLength === 1 ? 'item' : 'items';
        taskCount.innerHTML = `<strong>${filteredTasksLength}</strong> ${itemLeftText} left`;
}

const filterTasks = () => {
    filters.forEach(filter => {
        filter.addEventListener('click', event => {
            event.preventDefault(); 
            filter.classList.add('selected');
            const filterType = filter.getAttribute('href').substring(2); 
            filterTaskType(filterType);
        });
    });
}

// function call
hideMainAndFooterSections();
valueInput();



