const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const template = document.getElementById("todo-template");

// загрузка сохраненных задач из локального хранилища
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
savedTasks.forEach((task) => {
  const li = template.content.firstElementChild.cloneNode(true);
  li.querySelector("span").textContent = task.task;
  if (task.completed) {
    li.classList.add("completed");
  }
  list.appendChild(li);
});

// обработчик отправки формы
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = input.value.trim();

  if (task) {
    const li = template.content.firstElementChild.cloneNode(true);
    li.querySelector("span").textContent = task;
    list.appendChild(li);

    // сохранение задачи в локальное хранилище
    savedTasks.push({
      task: task,
      completed: false,
    });
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    input.value = "";
  }
});

// обработчик клика на кнопке complete
list.addEventListener("click", (event) => {
  const li = event.target.closest("li");

  if (event.target.classList.contains("complete-btn")) {
    li.classList.toggle("completed");
    li.style.color = 'green';

    // обновление статуса задачи в локальном хранилище
    const task = li.querySelector("span").textContent;
    const index = savedTasks.indexOf(task);
    savedTasks[index] = {
      task: task,
      completed: li.classList.contains("completed"),
    };
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }
});

// обработчик клика на кнопке удаления
list.addEventListener("click", (event) => {
  const li = event.target.closest("li");

  if (event.target.classList.contains("delete-btn")) {
    li.remove();

    // удаление задачи из локального хранилища
    const task = li.querySelector("span").textContent;
    savedTasks.splice(
      savedTasks.findIndex((item) => item.task === task),
      1
    );
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }
});
