/* DT208G - Programmering i TypeScript
 * Moment 2
 * Linn Eriksson, VT24
 */

import { TodoList } from "./TodoList";

//This file takes care of the dom-manipulation of the page.

//Variables.
const todos = new TodoList;
let todosArray = todos.getTodos();

//Init function.
window.onload = () => {
    //Print todolist, As the constructor is getting the todos, the object already contains the list.
    printTodoList(todosArray);

    //Add eventlistener to form.
    prepareForm();

}

function printTodoList(todosArray): void {
    //Get the section-element.
    let section = document.getElementById("todolist") as HTMLElement;

    //Make sure section is empty in case table is reprinted.
    section.innerHTML = "";
    section.innerHTML = "<h3>Att göra-lista</h3>";

    //Create table-elements needed.
    let table: HTMLTableElement = document.createElement("table");
    let tableHeader: HTMLTableSectionElement = document.createElement("thead");
    let tableBody: HTMLTableSectionElement = document.createElement("tbody");
    const trH: HTMLTableRowElement = tableHeader.insertRow();

    //Add headers and content.
    trH.innerHTML = "<th>Prio:</th><th>Att göra:</th><th>Status:</th><th>Färdig</th>";
    trH.style.borderBottom = "2px #208208 solid";
    trH.style.textAlign = "left";


    //Use a forloop to generate the rest of the list.
    for (let i = 0; i < todosArray.length; i++) {
        //Variables
        const todo = todosArray[i];
        const trB: HTMLTableRowElement = tableBody.insertRow();
        let status: string = "";

        //Check if task is completed.
        if(todo.completed) {
            status = "OK";
        } else {
            status = "-";
        }

        if(todo != undefined || todo != null) {
            //HTML for each table row.
            trB.innerHTML = `<td>${todo.priority}</td><td>${todo.task}</td><td>${status}</td><td><button class="completed button" id="completed${i}">Klar</button></td>`;
        }
    }

    //Create actual table.
    table.appendChild(tableHeader);
    table.appendChild(tableBody);

    //Style table as CSS doesn't now this part of the page exists.
    table.style.width = "100%";

    //Add the table to the section.
    section.appendChild(table);

    //Make buttons work.
    //Fetch buttons.
    const completedButtons = document.querySelectorAll("button.completed") as NodeListOf<HTMLButtonElement>;

    //Add event-listener to all buttons.
    for (let i = 0; i < completedButtons.length; i++) {
        const button = completedButtons[i];
        button.addEventListener("click", completeTodo);
    }

}

function completeTodo(click: Event): void {
    //Use the event to get the id from the button and slice away the initial part of id-name.
    let button = click.target as HTMLButtonElement;
    let id: string = button.id;
    let index: number = parseFloat(id.slice(9));

    //Use class to mark todo as complete.
    todos.markTodoCompleted(index);

    //Refresh array.
    todosArray = todos.getTodos();

    //Re-write todos.
    printTodoList(todosArray);
}

//Adding eventlistener to form
function prepareForm(): void {
    //Form as variable.
    const taskForm = document.getElementById("taskform") as HTMLFormElement;

    //Add eventlistener to form.
    taskForm.addEventListener("submit", addTodo);
}

//When form is submitted a todo is added.
function addTodo(submit: Event): boolean {
    //Stop the form from submitting the normal way.
    submit.preventDefault();

    //Get values from form
    const taskInput = document.getElementById("task") as HTMLInputElement;
    const priorityInput = document.getElementById("priority") as HTMLInputElement;
    let task: string = taskInput.value;
    let priority: number = parseFloat(priorityInput.value);

    //Variable for result.
    let result: boolean = false;

    //Input is validated in class so can be sent directly.
    result = todos.addTodo(task, priority);

    //As addTodo returns a bool, result can now be used to decide what to do.
    if (result) {
        //If Todo is addedreprint the page.
        printTodoList(todosArray);
        clearForm(taskInput, priorityInput);
        return true;
    } else {
        //If addTodo returns false print the message instead.

        //Variables.
        let message: string = todos.message;
        let span = document.getElementById("message") as HTMLSpanElement;

        //Add message as textcontent in message.
        span.textContent = message;

        //Return false as the add didn't work.
        return false;
    }
}

function clearForm(taskInput: HTMLInputElement, priorityInput: HTMLInputElement) {
    taskInput.value = "";
    priorityInput.value = "";

    //Clear span-messsage if exists.
    let span = document.getElementById("message") as HTMLSpanElement;
    span.textContent = "";
}