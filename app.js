const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector("#filter-todo");
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheck);
filterOption.addEventListener("click", filterTodo);
function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
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
    todoInput.value = "";
}
function deleteAndCheck(event) {
    const item = event.target;
    const targetTodo = item.parentElement;
    if (item.classList[0] === "trash-button") {
        targetTodo.classList.add("fall");
        targetTodo.addEventListener("transitionend", () => {
            targetTodo.remove();
        });
    }
    else if (item.classList[0] === "complete-button") {
        targetTodo.classList.toggle("completed");
    }
}
function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
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
