const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const errorEl = document.getElementById("error-el");
const ulEl = document.getElementById("ul-el");
const noTodoEl = document.getElementById("no-todo-yet");

let todoItems = [];

inputBtn.addEventListener("click", function(e) {
    e.preventDefault();
    addItemToList();
});

ulEl.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-el")) {
        const index = e.target.getAttribute('data-index');
        deleteItem(index);
    } else if (e.target.classList.contains("todo-checkbox")) {
        const index = e.target.getAttribute('data-index');
        toggleComplete(index);
    }
});

function render() {
    ulEl.innerHTML = "";
    
    let incompleteTodos = todoItems.filter(item => !item.completed);
    let completeTodos = todoItems.filter(item => item.completed);
    
    let sortedTodos = [...incompleteTodos, ...completeTodos];
    
    sortedTodos.forEach((item, index) => {
        ulEl.innerHTML += `
        <li>
            <div class="todo-item">
                <input type="checkbox" class="todo-checkbox" data-index="${todoItems.indexOf(item)}" ${item.completed ? "checked" : ""}>
                ${item.text}
            </div>
            <span class="delete-el icon icon-bin" data-index="${todoItems.indexOf(item)}"></span>
        </li>`;
    });

    if (!todoItems) {
        noTodoEl.textContent = "You haven't created any Todo item yet. Try to create one.";
    } else {
        noTodoEl.textContent = "";
    }
}

function addItemToList() {
    const inputValue = inputEl.value;
    if (inputValue === "") {
        errorEl.textContent = "Please enter a valid value";
    } else {
        errorEl.textContent = "";
        todoItems.push({ text: inputValue, completed: false });
        inputEl.value = "";
    }
    render();
}

function deleteItem(index) {
    index = parseInt(index);
    if (!isNaN(index) && index >= 0 && index < todoItems.length) {
        todoItems.splice(index, 1);
        render();
    }
}

function toggleComplete(index) {
    index = parseInt(index);
    if (!isNaN(index) && index >= 0 && index < todoItems.length) {
        todoItems[index].completed = !todoItems[index].completed;
        render();
    }
}
