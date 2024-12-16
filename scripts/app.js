//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

// DOM ELEMENTS
const taskInput=document.getElementById("new-task");
const addButton = document.querySelector(".add-item__button");
const incompleteTaskHolder=document.getElementById("incompleteTasks");
const completedTasksHolder=document.getElementById("completed-tasks");



//New task list item
const createNewTaskElement = (taskString) => {
    const listItem = document.createElement("li");
    listItem.className = "todo-list__item";

    // Create input (checkbox)
    const checkBox = document.createElement("input");
    checkBox.className = "todo-list__checkbox";
    checkBox.type = "checkbox";

   // Create label
    const label = document.createElement("label");
    label.innerText = taskString;
    label.className = 'todo-list__task';

    // Create input (text) for editing
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "todo-list__input";


   // Create edit and delete buttons
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "todo-list__button todo-list__button--edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "todo-list__button todo-list__button--delete";

    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = '/images/remove.svg';
    deleteButtonImg.className = "todo-list__icon";
    deleteButtonImg.alt = "Delete";
    deleteButton.appendChild(deleteButtonImg);


    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}


const addTask = () => {
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";
}

//Edit an existing task.
const editTask = function() {
    const listItem=this.parentNode;
    const editInput = listItem.querySelector('.todo-list__input');
    const label = listItem.querySelector(".todo-list__task");
    const editBtn = listItem.querySelector(".todo-list__button--edit");
    const isInEditMode = listItem.classList.contains("todo-list__item--edit-mode");

    //If class of the parent is .editmode
    if(isInEditMode){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    listItem.classList.toggle("todo-list__item--edit-mode");
};


//Delete task.
const deleteTask = function() {
    const listItem=this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function() {
    //Append the task list item to the #completed-tasks
    const listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    const listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}


// Bind events to task list items
const bindTaskEvents= (taskListItem,checkBoxEventHandler) => {
    const checkBox = taskListItem.querySelector(".todo-list__checkbox");
    const editButton = taskListItem.querySelector(".todo-list__button--edit");
    const deleteButton = taskListItem.querySelector(".todo-list__button--delete");

    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}


// Initial binding of events to existing tasks in the list
const bindExistingTasks = () => {
    for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
        bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
    }
};

addButton.addEventListener("click", addTask);
bindExistingTasks();

