import "./style.css";
import "./todo.js"
import { createTask } from "./todo.js";
import {
    addTodo,
    filterTodo,
    deleteTodo,
    toggleComplete
} from "./project.js";

let currentFilter = "All";


const container = document.getElementById("container");
const dialog = document.querySelector("dialog");
const addbtn = document.getElementById("add-todo");
const submit = document.getElementById("submit");
const cancel = document.getElementById("cancel");


function showDialog(){
    dialog.showModal();
}

function closeDialog(){
    dialog.close();
}

addbtn.addEventListener("click",()=>{
    showDialog();
});

submit.addEventListener("click",(e)=>{
    e.preventDefault();
    closeDialog();
    handleTodo();
    
});

cancel.addEventListener("click",()=>{
    closeDialog();
});

function formreset(){
    
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const date = document.getElementById("date");

    title.value = "";
    description.value = "";
    date.value = "";

}

function handleTodo(){
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;

    const newTodo = createTask(title,description,date);
    addTodo(newTodo);
    
    formreset();
    displayTodo();
}

function displayTodo(){
    container.innerHTML = '';
    
    let todos = filterTodo(currentFilter);

    todos.forEach(todo => {

        const div = document.createElement("div");
        div.classList.add("todo-card");
        
        div.innerHTML = `
            
            <h3> ${todo.title}</h3>
            
            <p> ${todo.dueDate}</p>
            <div class = "actions">
                <button data-id = "${todo.id}" class = "complete-btn">${todo.completed ? "Completed": "Complete"}</button>

                <button data-id = "${todo.id}" class = "delete-btn"><ion-icon name="trash-sharp"></ion-icon></button>

                <button data-id = "${todo.id}" class = "edit-btn"><ion-icon name="create-outline"></ion-icon></button>
            </div>
        `
        container.appendChild(div);
    });
    attachListeners();    
}

const filtertabs = document.querySelectorAll(".filter-tab");
filtertabs.forEach(tab => 
    tab.addEventListener("click",(e)=>{
        filtertabs.forEach(t => t.classList.remove("active"));
        e.currentTarget.classList.add("active");

        currentFilter = e.currentTarget.dataset.filter;
        displayTodo();
    })
)


displayTodo();

function attachListeners(){

    const edit = document.querySelectorAll(".edit-btn");
    const deletebtn = document.querySelectorAll(".delete-btn");
    const completebtn = document.querySelectorAll(".complete-btn");

    deletebtn.forEach( element =>{
        element.addEventListener("click",(e)=>{
            const id = e.currentTarget.dataset.id;
            deleteTodo(id);
            displayTodo();
        });
    });
    completebtn.forEach( element =>{
        element.addEventListener("click",(e)=>{
            const id = e.currentTarget.dataset.id;
            toggleComplete(id);
            displayTodo();
        });
    });
    
}
