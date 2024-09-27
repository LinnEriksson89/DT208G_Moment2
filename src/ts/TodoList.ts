/* DT208G - Programmering i TypeScript
 * Moment 2
 * Linn Eriksson, VT24
 */

//Import interface
import {Todo_interface} from "./Todo_interface";

//Class for Todos.
export class TodoList {
    //Variables.
    private todos: Todo_interface[] = [];
    public message:string = "";

    //constructor
    public constructor() {
        this.todos = this.getTodos();
    }

    //Add todo to array.
    public addTodo(task:string, priority: number): boolean {
        //Variables
        let todo:Todo_interface;

        //Check input
        if(!task || !priority) {
            this.message = "Uppgift eller prioriteringsgrad saknas!";
            return false;
        } else if (priority < 1 || priority > 3) {
            this.message = "Pririteringsgrad är utanför accepterat intervall!";
            return false;
        } else {

            //If input is fine, create todo.
            todo = {
                task: task,
                completed: false,
                priority: priority
            }

            //Push todo to array and save to local storage.
            this.todos.push(todo);
            this.saveToLocalStorage();

            //Todo has been added, return true.
            return true;
        }

        //Shouldn't be possible to end up here.
    }

    public markTodoCompleted(todoIndex: number): void {
        //Change the todo to completed and save to localstorage.
        this.todos[todoIndex].completed = true;
        this.saveToLocalStorage();
    }

    public getTodos(): Todo_interface[] {
        //Get the todolist from local storage.
        this.loadFromLocalStorage();

        //Todolist is saved in todos and can be returned.
        return this.todos;
    }

    public saveToLocalStorage(): void {
        //Save the todos-array by setting the item "todos" in localstorage.
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    public loadFromLocalStorage(): void {
        //Get todos from localstorage.
        const todoList = localStorage.getItem("todos");

        //If there are todos, parse the string to use in array.
        if(todoList) {
            this.todos = JSON.parse(todoList);
        } else if(todoList == null) {
            //If there are no todos just make sure that the local storage item is created.
            localStorage.setItem("todos", "[{}]");
        }
    }
}