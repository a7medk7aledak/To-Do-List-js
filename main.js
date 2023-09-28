let input = document.querySelector("input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// array of tasks
let arr = [];
// check if theres tasks in local strage 
if (window.localStorage.getItem("tasks"))
    arr = JSON.parse(localStorage.getItem("tasks"))
    getFromLocalStrorage ();
// Add Task
submit.addEventListener("click" , function () {
    if(input.value !== "") {
        addTask(input.value);
        input.value = "";
    }
})
input.addEventListener("keyup" , function (e) {
    if (e.key === "Enter") {
        if(input.value !== "") {
            addTask(input.value);
            input.value = "";
        }
    }

})
tasksDiv.addEventListener("click",(e)=> {
    if(e.target.classList.contains("del"))
    {
        deleteTask(e.target.parentElement.getAttribute("data-id"))
        e.target.parentElement.remove()
    }
    if(e.target.classList.contains("task")) {
        CheangeStatusTask(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done")
    }
})

function addTask(taskText) {
    const task = {
        id: Date.now(),
        text : taskText,
        status: false,
    };
    arr.push(task);
    addElements(arr);
    addToLocalStrorage(arr);
}
function addElements () {
    tasksDiv.innerHTML = "";
    arr.forEach((task)=> {
        let div = document.createElement("div");
        div.className = "task";
        // check if Task is Done
        if (task.status)
            div.className = "task done";
        div.setAttribute("data-id",task.id);
        div.append(document.createTextNode(task.text));
        //create delete buttom
        let span = document.createElement("span");
        span.className = "del"
        span.innerHTML = "Delete";
        div.append(span);
        tasksDiv.append(div);
    })
} 
function addToLocalStrorage(arrOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrOfTasks))
}
function getFromLocalStrorage () {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        addElements(JSON.parse(data))
    }
}

function deleteTask (taskId) {
    arr = arr.filter((task)=> task.id != taskId)
    addToLocalStrorage(arr)
}

function CheangeStatusTask (taskId) {
    for(let i=0; i<arr.length;i++) {
        if (arr[i].id==taskId) {
            arr[i].status == false ? (arr[i].status = true) : (arr[i].status = false);
        }
    }
      addToLocalStrorage(arr);  
}