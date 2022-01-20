const todoInput: HTMLInputElement = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector("#filter-todo");

class Todo {
  value: string;
  id: string;

  constructor(value: string, id: string) {
    this.value = value;
    this.id = id;
  }
}

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheck);
filterOption.addEventListener("change", filterTodo);
document.addEventListener("DOMContentLoaded", createTodosFromLocal);

function addTodo(event): void {
  event.preventDefault();
  const uuid = Date.now().toString();
  createTodo(todoInput.value, uuid);
  saveLocalTodos(todoInput.value, uuid);
  todoInput.value = "";
}

function createTodo(value: string, uuid: string): any {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add(uuid, "todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const completeButton = document.createElement("button");
  completeButton.innerHTML = "<i class='fas fa-check'></i>";
  completeButton.classList.add("complete-button");
  todoDiv.appendChild(completeButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
}

function deleteAndCheck(event): void {
  const item = event.target;
  const targetTodo = item.parentElement;
  if (item.classList[0] === "trash-button") {
    targetTodo.classList.add("fall");
    targetTodo.addEventListener("transitionend", () => {
      targetTodo.remove();
      deleteTodoFromLocal(targetTodo.classList[0]);
    });
  } else if (item.classList[0] === "complete-button") {
    targetTodo.classList.toggle("completed");
  }
}

function filterTodo(event): void {
  const todos = todoList.childNodes;
  todos.forEach((todo: HTMLElement) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.classList.contains("completed")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
        break;
      case "uncompleted":
        !todo.classList.contains("completed")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
        break;
    }
  });
}

function saveLocalTodos(value: string, uuid: string): void {
  let todos = [];
  if (localStorage.getItem("todos") !== null) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const newTodo = new Todo(value, uuid);
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos(): Todo[] {
  let todos = [];
  if (localStorage.getItem("todos") !== null) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function createTodosFromLocal(): void {
  const todos = getLocalTodos();
  todos.forEach((todo) => {
    createTodo(todo.value, todo.id);
  });
}

function deleteTodoFromLocal(id: string): void {
  let todos = getLocalTodos();
  todos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
}
