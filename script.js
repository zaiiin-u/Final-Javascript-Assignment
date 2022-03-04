/// GLOBAL VARIABLES

const input = document.getElementById("input-text");
let id = 0;
////TASK
class Task {
  constructor(title) {
    this.title = title;
    this.now = new Date();
    this.id = id;
  }
  getDate() {
    return this.now.toLocaleDateString();
  }
  getTime() {
    return this.now.toLocaleTimeString();
  }

  createTask(title) {
    const html = `
<div class=" task_details task_details_${this.id}"id="task-details-${this.id}" >
<div class="task_data" >
<ul class="direction"><li class="task_name">ToDo ${
      tasks.findIndex((element) => element.id === this.id) + 1
    } : ${this.title} </li> 
<li class="time_and_date">${this.getDate()}  @  ${this.getTime()}</li>
</ul>
</div>
<div class= "button_response">
<button class="btn_editt" id="btn-editt-${
      this.id
    }" ><i class="fa fa-edit"></i></button>
<button class ="btn_donee" id="btn-donee-${
      this.id
    }" ><i class="fa fa-check"></i></button>
<button class ="btn_delete" id="btn-deletee-${
      this.id
    }" ><i class="fa fa-window-close"></i></button> 
</div>
</div>
`;
    document.getElementById("tasks").insertAdjacentHTML("beforeend", html);
    this.clearInput();

    const btn_done = document.getElementById(`btn-donee-${this.id}`);
    btn_done.addEventListener("click", () => this.taskDone());

    const btn_delete = document.getElementById(`btn-deletee-${this.id}`);
    btn_delete.addEventListener("click", () => this.taskDelete());

    const btn_edit = document.getElementById(`btn-editt-${this.id}`);
    btn_edit.addEventListener("click", () => this.taskEdit());
  }
  //TO ASSIGN DONE
  taskDone() {
    document.querySelector(`.task_details_${this.id}`).style.backgroundColor =
      "palevioletred";
  }
  // To DELETE TASK
  taskDelete() {
    const taskToBeDeleted = tasks.findIndex(
      (element) => element.id === this.id
    );
    tasks.splice(taskToBeDeleted, 1);
    updateUI();
  }
  // To EDIT TASK
  taskEdit() {
    const HTML = `<div class = "replace_data_input">
<input class="replace_input" id="replace-input-${this.id}" type="text">
<button class="replace_button" id="replace-btn-${this.id}">Replace</button>
</div>
`;
    document.getElementById("tasks").insertAdjacentHTML("beforeend", HTML);

    const replaceInput = document.getElementById(`replace-input-${this.id}`);
    const btn_replace = document.getElementById(`replace-btn-${this.id}`);
    btn_replace.addEventListener("click", () => {
      if (replaceInput.value === "") {
        alert("You must write something!");
      } else {
        this.title = replaceInput.value;
        console.log(tasks);
        updateUI();
      }
    });
  }

  //TO  CLEAR INPUT
  clearInput() {
    input.value = "";
  }
}

///////////////////////////////////Main/////////////////////////

const tasks = [];
const taskstored = JSON.parse(localStorage.getItem("taskDetails"));
console.log(taskstored);

//window.onload =
getstorage();
function addTask() {
  if (input.value === "") {
    alert("You must write something!");
  } else {
    const newTask = new Task(input.value);
    tasks.push(newTask);
    newTask.createTask(newTask.title);
    console.log(tasks);
    setStorage();
  }
  id++;
}

///GET TASKS STORAGE
function getstorage() {
  taskstored.forEach((task) => {
    console.log(task.title);
    //task.createTask(task.title);
    const newTask = new Task(task.title);
    tasks.push(newTask);
    newTask.createTask(task.title);
  });
}
///GET TASKS STORAGE
function setStorage() {
  localStorage.setItem("taskDetails", JSON.stringify(tasks));
  console.log(JSON.parse(localStorage.getItem("taskDetails")));
}

///UPDATE TASKS
function updateUI() {
  document.getElementById("tasks").innerHTML = "";
  tasks.forEach((task) => {
    task.createTask(task.title);
  });
  setStorage();
}

/////LOCAL STORAGE
/*const storedInput = localStorage.getItem("textinput");
if (input) {
  input.textContent = input;
}
input.addEventListener("input", (letter) => {
  input.textContent = letter.target.value;
});
const savetolocalStorage = () => {
  localStorage.setItem("textinput", input.textContent);
};
const btn = document.querySelector(".add_button");
btn.addEventListener("click", savetolocalStorage);*/

//var localObject = [];

//var testObject = { userName: "secondUser", password: "password2" };
//localObject.push(testObject);

/*
function persist(event) {
  localStorage.setItem(event.target.id, event.target.value);
}

document.querySelectorAll("input").forEach((inputEl) => {
  inputEl.value = localStorage.getItem(inputEl.id);
  inputEl.addEventListener("change", persist);
});

*/
